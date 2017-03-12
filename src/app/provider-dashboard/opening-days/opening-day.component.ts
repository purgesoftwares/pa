import {Component, ElementRef } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgZone, OnInit, ViewChild } from '@angular/core';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import * as $ from 'jquery';

@Component({
	moduleId: module.id,
	selector: 'opening-day-cmp',
	templateUrl: 'opening-day.component.html'
})

export class OpeningDayComponent {
	openingDays;
	backOpeningDays: any= {};
	/*weekDays = [
				{"day":"Sunday", "selected":false},
				{ "day":"Monday", "selected":false},
				{"day":"Tuesday", "selected":false },
				{"day":"Wednesday", "selected":false},
				{"day":"Thursday", "selected":false},
				{"day":"Friday", "selected":false},
				{"day":"Saterday", "selected":false},
					];*/
	weekDays = [
				{"day":"SUNDAY", "selected":false},
				{ "day":"MONDAY", "selected":false},
				{"day":"TUESDAY", "selected":false },
				{"day":"WEDNESDAY", "selected":false},
				{"day":"THURSDAY", "selected":false},
				{"day":"FRIDAY", "selected":false},
				{"day":"SATURDAY", "selected":false},
					];
	selectedDays = [];
	model: any= {};
	message: any= {};
	mess = false;
	loading = false;
	private ids:any[]=[];
	public show:any[]=[];


	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {

		this.http.get('http://54.161.216.233:8090/api/secured/user/current-provider?access_token=' + this.token)
			.map(res => res.json())
			.catch(e => {
				console.log(e);
	            if (e.status === 401 || e.status === 0) {
	                return Observable.throw('Unauthorized');
	            }
	            // do any other checking for statuses here
	        })
	        /*.catch( ( errorRes: Response ) => {
                     Observable.throw( errorRes.json().data );
                 })*/

			.subscribe(
				data => { 
				console.log(data);
				if(data && data.id) {
      				this.model = data;
					this.model.providerName = this.model.provider_name;
					this.backOpeningDays.providerId = this.model.id;

					this.http.get('http://54.161.216.233:8090/api/secured/opening-day/get-by-provider/' 
					+ this.model.id + '?access_token=' 
						+ this.token)
						.map(res => res.json())
						.subscribe(
							data => { 
								console.log(data);
								if(data) {
			          				this.openingDays = data;
			          				
			          				var days = [];

			          				this.openingDays.forEach(function(jv) {
							  			if(jv.status==1) {
							  				days.push(jv);
										}
									});
									this.selectedDays = days;

			          			} 
			          		},
							error => { if(error.json().error) {
										this.message = error.json().message;
										this.mess = true;
									}},
							() => console.log("complete")
						);


          			} else {
              			this.mess 		=	true;
              			this.message	= 	"There is no records found.";
          			}},
				error => { 
					console.log(error);
					if(error == "Unauthorized"){
						this.toasterService.pop('error', 'Unauthorized',
						 "Session expired or invalid access.");
						this.router.navigate(['/provider-login']);
            			return false;
					}
					
					if(error.json().error) {
							this.message = error.json().message;
							this.mess = true;
						}
				},
				() => console.log("complete")
			);
	}

	checking(id) {

  		var check = false;
  		var thisObj = this;
  		if(this.openingDays) {
  			
	  		this.openingDays.forEach(function(jv) {
	  			
				if(id == jv.day && jv.status==1) {
	  				check = true;
				}
			});
		}
		return check;
  	}
  	camalcase(str) {
	    return str
	        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
	        .replace(/\s/g, '')
	        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
	}

  	checkbox(event: boolean, weekDay) {
  		
  		if(event) {
	  		if(this.selectedDays.indexOf(weekDay) == -1){
	  			this.selectedDays = [...this.selectedDays, weekDay];
	  			this.ids = [...this.ids, weekDay.day]
			}
		} else {
			
			var thisObj = this;
			this.selectedDays = this.selectedDays.filter(function(elem){
				return elem.day != weekDay.day;
	 		})
	 		this.ids = this.ids.filter(function(elem){
				return elem != weekDay.day;
	 		});
		}
		console.log(this.selectedDays);
		console.log(this.ids);
  	}



	save() {

		this.loading = true;
		
		console.log(this.model);
		console.log(this.selectedDays);

		this.backOpeningDays.providerId = this.model.id;
		var days = [];

		for (var i = this.selectedDays.length - 1; i >= 0; i--) {
			days.push(this.selectedDays[i].day);
		}

		this.backOpeningDays.days = days;

		let headers = new Headers();
  		headers.append('content-Type', 'application/json');

		this.http.post('http://54.161.216.233:8090/api/secured/opening-day/?access_token=' 
			+ this.token, this.backOpeningDays, {headers: headers})
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    	console.log(data);
			    	if(data.status == 200) {
			    		var datamodel = JSON.stringify(eval("(" + data.text() + ")"));
			    		this.toasterService.pop('success', 'Success',
			    		 'Your account successfully updated!');

			    		this.loading = false;

			    	} else {this.mess= true;
				    	this.message= 'Value is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;}},
			    error => {console.log(error);
				    this.mess= true;
				    this.message= 'Some Error! Please Try After Some Time '; 
			    	if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}
				    this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;
				}
			 );
	} 
}
