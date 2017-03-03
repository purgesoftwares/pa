import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

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


	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		this.http.get('http://54.161.216.233:8090/api/secured/user/current-customer?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data.id) {
                  				this.model = { 	id: data.id,
                  								email: data.mainEmail,
                  								username: data.fullName
                  								};
  
                  			} else {
                      			this.mess 		=	true;
                      			this.message	= 	"There is no records found.";
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}},
  					() => console.log("complete")
  				);
	}

    popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

	save() {

		this.loading = true;
		if(this.model.password != this.model.cpassword){
			this.mess= true;
			this.message= 'Password and confirm password should be same!'; 
		}

		let headers = new Headers();
  		headers.append('content-Type', 'application/json');

		this.http.put('http://54.161.216.233:8090/api/secured/customer/update/'+this.model.id + '?access_token=' + this.token, this.model, {headers: headers})
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 

			    	if(data.status == 200) {
			    		var datamodel = JSON.stringify(eval("(" + data.text() + ")"));
			    		this.toasterService.pop('success', 'Success',
			    		 'Your account successfully updated!');

			    		//this.model.password = "";
			    		//this.model.cpassword = "";
			    		this.loading = false;

			    		//localStorage.setItem('access_token', data);
				    	//this.router.navigate(['/login']);
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
