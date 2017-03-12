import {Component, ElementRef } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgZone, OnInit, ViewChild } from '@angular/core';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import * as $ from 'jquery';

@Component({
	moduleId: module.id,
	selector: 'profile-cmp',
	templateUrl: 'profile.component.html'
})

export class ProviderProfileComponent {
	model: any= {};
	message: any= {};
	mess = false;
	loading = false;

	public latitude;
	public longitude;
	public searchControl: FormControl;
  	public zoom: number;
	public selecting = true;

	@ViewChild("address")
	public searchElementRef: ElementRef;

	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService, 
				private mapsAPILoader: MapsAPILoader,
				private ngZone: NgZone ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		    //set google maps defaults
	    this.zoom = 4;
	    this.latitude = 39.8282;
	    this.longitude = -98.5795;
	    this.selecting = true;

	    //create search FormControl
	    this.searchControl = new FormControl();

	    //set current position
	    this.setCurrentPosition();

	    //load Places Autocomplete
	    this.mapsAPILoader.load().then(() => {
	      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
	        types: ["address"]
	      });
	      autocomplete.addListener("place_changed", () => {
	        this.ngZone.run(() => {
	          //get the place result
	          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

	          console.log(place);
	          this.model.address = place.formatted_address;
	          //verify result
	          if (place.geometry === undefined || place.geometry === null) {
	            return;
	          }
	          console.log(place);

	          //set latitude, longitude and zoom
	          this.latitude = place.geometry.location.lat();
	          this.longitude = place.geometry.location.lng();
	          this.zoom = 12;
	          this.selecting = false;
	        });
	      });
	    });


		this.http.get('http://54.161.216.233:8090/api/secured/user/current-provider?access_token=' + this.token)
			.map(res => res.json())
			.catch(e => {
				console.log(e);
	            if (e.status === 401 || e.status === 0) {
	                return Observable.throw('Unauthorized');
	            }
	            // do any other checking for statuses here
	        })
			.subscribe(
				data => { if(data && data.id) {
      				this.model = data;
					this.model.providerName = this.model.provider_name;

					this.http.get('http://54.161.216.233:8090/api/secured/address/' 
					+ this.model.addressId + '?access_token=' 
						+ this.token)
						.map(res => res.json())
						.subscribe(
							data => { 
								if(data && data.id) {
			          				this.model.country = data.country;
			          				this.model.city = data.city;
			          				this.model.address = data.address1;
									this.model.providerName = this.model.provider_name;
			          			} else {
			              			this.mess 		=	true;
			              			this.message	= 	"There is no records found.";
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
          			}
          		},
				error => { 

					if(error == "Unauthorized"){
						this.toasterService.pop('error', 'Unauthorized',
						 "Session expired or invalid access.");
						this.router.navigate(['/provider-login']);
            			return false;
					}

					if(error.json().error) {
							this.message = error.json().message;
							this.mess = true;
						}},
				() => console.log("complete")
			);
	}

	private setCurrentPosition() {

	    if ("geolocation" in navigator) {
	      navigator.geolocation.getCurrentPosition((position) => {
	        console.log(position);
	        this.latitude = position.coords.latitude;
	        this.longitude = position.coords.longitude;
	        this.zoom = 12;
	        this.selecting = false;
	      });
	    }

	}

    popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

	save() {

		this.loading = true;
		if(this.model.password != this.model.confirmPassword){
			this.mess= true;
			this.message= 'Password and confirm password should be same!'; 
			this.toasterService.pop('error', 'Error',
			    		 this.message);
			return false
		}

		let headers = new Headers();
  		headers.append('content-Type', 'application/json');

		this.http.put('http://54.161.216.233:8090/api/secured/provider/signup/'
			+ this.model.id + '?access_token=' + this.token, this.model, {headers: headers})
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    	console.log(data);
			    	if(data.status == 200) {
			    		var datamodel = JSON.stringify(eval("(" + data.text() + ")"));
			    		this.toasterService.pop('success', 'Success',
			    		 'Your account successfully updated!');

			    		this.model.password = "";
			    		this.model.cpassword = "";
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
