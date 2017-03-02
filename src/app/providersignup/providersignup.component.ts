import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
/**
*	This class represents the lazy loaded SignupComponent.
*/

declare const FB:any;

declare const gapi: any;

@Component({
	moduleId: module.id,
	selector: 'providersignup-cmp',
	templateUrl: 'providersignup.component.html'
})

export class ProviderSignupComponent { 
	model: any= {};
	user: any= {};
	guser: any= {};
	objThis: any= {};
	message: any= {};
	mess = false;
	loading = false;

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
		FB.init({
            appId      : '379633659081437',
            cookie     : false,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.5' // use graph api version 2.5
        });
	}




 



	signup() {

		this.loading = true;
		
		this.http.post('http://54.161.216.233:8090/api/public/customer/signup', this.model)
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 

			    	if(data.status == 200) {
			    		var datamodel = JSON.stringify(eval("(" + data.text() + ")"));
			    		this.toasterService.pop('success', 'Success',
			    		 'Your account successfully created! Login to access');
			    		//localStorage.setItem('access_token', data);
				    	this.router.navigate(['/providerlogin']);
			    	} else {this.mess= true;
				    	this.message= 'Value is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;}},
			    error => {console.log(error);
				    this.mess= true;
				    this.message= 'Some Error! Please Try After Some Time '; 
				    this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;
				}
			 );
	}
}
