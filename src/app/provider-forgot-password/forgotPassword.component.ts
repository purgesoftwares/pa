import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'forgot-password-cmp',
	templateUrl: 'forgotPassword.component.html',
})

export class ForgotPasswordComponent {
	model: any= {};
	message: any= {};
	mess = false;
	loading = false;

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	retrive() {

		this.loading = true;
		this.http.get('http://54.161.216.233:8090/api/public/user/reset-password/'+this.model.email)
			.map((res:Response) => res.json())
			.subscribe(
			    data => {
			    
			    	if(!data.error) {
			    		
			    		this.mess 		= true;
				    	this.message 	= "Retrive link sent to your email account successfully!";
			    		this.toasterService.pop('success', 'Success',
			    		this.message);
			    		this.loading = false;
			    		 
			    	} else {
			    		this.mess 	 	= true;
				    	this.message 	= data.message;
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading 	= false;
				    }
				},
			    error => {console.log(error);
			    	
			    	error = error.json();
			    	
				    this.mess= true;
				    this.message= error.error; 
				     this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;
				}
			 );
	}
}