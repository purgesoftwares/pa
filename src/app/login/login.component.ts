import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
})

export class LoginComponent {
	model: any= {};
	message: any= {};
	mess = false;
	loading = false;

	constructor( private http : Http,
				private router: Router ) {}

	login() {

		this.loading = true;
		this.http.post('http://54.161.216.233:8090/api/oauth/token', this.model)
			.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    	if(data) {
			    		localStorage.setItem('access_token', data);
				    	this.router.navigate(['/dashboard']);
			    	} else {this.mess= true;
				    	this.message= 'Username Password is incorrect';
				    	this.loading = false;}},
			    error => {console.log(error);
				    this.mess= true;
				    this.message= 'Some Error! Please Try After Some Time '; 
				    this.loading = false;
				}
			 );
	}
}