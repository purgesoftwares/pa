import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

/**
*	This class represents the lazy loaded LoginComponent.
*/

declare const FB:any;

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
})

export class LoginComponent {
	model: any= {};
	user: any= {};
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

	onFacebookLoginClick() {
		FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });

		var objThis = this;

        FB.login((result: any) => {
		    //this.loged = true;
		    //this.token = result;
		    FB.getLoginStatus(response => {
	            objThis.statusChangeCallback(response);
	        });
	        
		  }, { scope: 'email' });
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
        	console.log(resp);
        	this.me();
            // connect here with your server for facebook login by passing access token given by facebook
        }else if (resp.status === 'not_authorized') {
            
        }else {
            console.log(resp);
        }
    };

    ngOnInit() {
       /* FB.getLoginStatus(response => {
            this.statusChangeCallback(response);
        });*/
    }

	checkaccount() {

		this.loading = true;
		this.http.get('http://54.161.216.233:8090/api/public/user/check-account/'+this.user.email)
			.map((res:Response) => res.json())
			.subscribe(
			    data => { 
			    	console.log(data);
			    	if(!data) {
			    		this.signup();
				    	this.loading = false;
			    		
			    	} else {this.mess= true;
				    	this.dlogin();
				    	this.loading = false;
				    }
				   },
			    error => {console.log(error);
				    this.mess= true;
				    this.message= 'Some Error! Please Try After Some Time '; 
				     this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;
				}
			 );
	}

	signup() {

		this.loading = true;
		this.model = {"email": this.user.email, "username": this.user.name, "password": "123456", "cpassword": "123456"}
		console.log(this.model); 
		this.http.post('http://54.161.216.233:8090/api/public/customer/signup', this.model)
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 

			    	if(data.status == 200) {
			    		var datamodel = JSON.stringify(eval("(" + data.text() + ")"));
			    		this.toasterService.pop('success', 'Success',
			    		 'Your account successfully created!');
			    		//localStorage.setItem('access_token', data);
						this.dlogin();
			    	} else {
			    		this.mess= true;
				    	this.message= 'Value is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;
				    }
				},
			    error => {console.log(error);
				    this.mess= true;
				    this.message= 'Some Error! Please Try After Some Time '; 
				    this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;
				}
			 );
	}


    me() {
    	var objThis = this;
	    FB.api('/me?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range',
	        function(result) {
	            if (result && !result.error) {
	                objThis.user = result;
	                console.log(objThis.user);
	                //objThis.checkaccount();
	                objThis.dlogin();
	            } else {
	                console.log(result.error);
	            }
	        });
	}



	dlogin() {

		this.loading = true;
		this.model = {"username":"shankar@purgesoft.com", "password":"123456" };
		this.http.post('http://54.161.216.233:8090/api/oauth/token', this.model)
			.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    	if(data) {
			    		localStorage.setItem('access_token', data);
			    		this.toasterService.pop('success', 'Success',
			    		 'Logged in successfully!');
			    		 window.location.href = "/dashboard";
				    	this.router.navigate(['/dashboard']);
			    	} else {this.mess= true;
				    	this.message= 'Username Password is incorrect';
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

		/*this.loading = true;
		this.http.get('http://localhost:8090/api/oauth/token/fb/'+this.user.email)
			.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    	console.log(data);
			    	
				    },
			    error => {console.log(error);
				    this.mess= true;
				    this.message= 'Some Error! Please Try After Some Time '; 
				     this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;
				}
			 );*/
	}

	login() {

		this.loading = true;
		this.http.post('http://54.161.216.233:8090/api/oauth/token', this.model)
			.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    	if(data) {
			    		localStorage.setItem('access_token', data);
			    		this.toasterService.pop('success', 'Success',
			    		 'Logged in successfully!');
			    		 window.location.href = "/dashboard";
				    	this.router.navigate(['/dashboard']);
			    	} else {this.mess= true;
				    	this.message= 'Username Password is incorrect';
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