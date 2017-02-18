import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

/**
*	This class represents the lazy loaded ResetComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'reset-password-cmp',
	templateUrl: 'resetPassword.component.html',
})

export class ResetPasswordComponent {
	model: any= {};
	message: any= {};
	mess = false;
	loading = false;
	resetToken: any = {};

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService , private route: ActivatedRoute) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		this.route.queryParams.subscribe(data => {this.resetToken.id = data['id'], this.resetToken.token = data['token'] });

		this.http.get('http://54.161.216.233:8090/api/public/user/check-token/' + this.resetToken.id + '/' + this.resetToken.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { 
  					console.log(data);
  					if(data) {

                  		this.http.get('http://54.161.216.233:8090/api/public/user/get-mail/' + this.resetToken.id)
			  				.map(res => res.text())
			  				.subscribe(
			  					data => { 
			  					if(data) {
		                  			this.model = { 	email: data };
		  
		                  			} else {
		                      			this.mess 		=	true;
		                      			this.message	= 	"Your Link is expired or Invalid.";
		                      			this.toasterService.pop('error', 'Invalid OR Expired', this.message);
		                  			}},
			  					error => { if(error.json().error) {
												this.message = error.json().message;
												this.mess = true;
												this.toasterService.pop('error', 'Error', this.message);
											}},
			  					() => console.log("complete")
			  				);

              			} else {
                  			this.mess 		=	true;
                  			this.message	= 	"Your Link is expired or Invalid.";
                  			this.toasterService.pop('error', 'Invalid OR Expired', this.message);
              			}
                  	},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
									this.toasterService.pop('error', 'Error', this.message);
								}},
  					() => console.log("complete")
  				);
	}

	update() {

		this.loading = true;
		let headers = new Headers();
  		headers.append('content-Type', 'application/json');

		this.http.post('http://54.161.216.233:8090/api/public/user/change-password/?id='+this.resetToken.id 
			+ '&token='+this.resetToken.token,
		 this.model, {headers: headers})
			.map((res:Response) => res.json())
			.subscribe(
			    data => {
			    
			    	if(!data.error) {
			    		
			    		this.mess 		= true;
				    	this.message 	= "Password updated successfully! Login Now.";
			    		this.toasterService.pop('success', 'Success',
			    		this.message);
			    		this.loading = false;
			    		this.router.navigate(['/login']);
			    		 
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