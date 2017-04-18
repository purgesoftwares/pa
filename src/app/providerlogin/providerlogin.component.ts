import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import * as globals from './../globals';

/**
*	This class represents the lazy loaded LoginComponent.
*/

declare const FB:any;

declare const gapi: any;

@Component({
	moduleId: module.id,
	selector: 'providerlogin-cmp',
	templateUrl: 'providerlogin.component.html',
})

export class ProviderLoginComponent {
	model: any= {};
	user: any= {};
	guser: any= {};
	objThis: any= {};
	globals: any= {};
	message: any= {};
	mess = false;
	loading = false;

	private toasterService: ToasterService;

	constructor( private http : Http, private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
		this.globals = globals;
		FB.init({
		appId      : '379633659081437',
			cookie     : false,  // enable cookies to allow the server to access
			// the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.5' // use graph api version 2.5
		});
	}


	public auth2: any;


 

	login() {

		this.loading = true;
		this.model.username = this.model.username.toLowerCase();
		this.http.post('http://54.161.216.233:8090/api/oauth/token/provider', this.model)
			.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    	console.log(data);
			    	if(data && data!="") {
			    		localStorage.setItem('access_token', data);
			    		localStorage.setItem('isProvider', "true");
			    		this.toasterService.pop('success', 'Success',
			    		 'Logged in successfully!');
			    		setTimeout(function(){ 
				    		window.location.href = "/provider-dashboard";
				    		this.router.navigate(['/provider-dashboard']);
				    	}, 300);
 
			    		
			    	} else {this.mess= true;
				    	this.message= 'Username Password is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;}},
			    error => {console.log(error);
			    	error = error.json();
				    this.mess= true;
				    this.message= (error.message?error.message:(error.error?error.error:'Some Error! Please Try After Some Time ')); 
				     this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;
				}
			 );
	}
}