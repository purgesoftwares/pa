import { Component } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

/**
*	This class represents the lazy loaded ResetComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'contact-us-cmp',
	templateUrl: 'contact-us.component.html',
})

export class ContactUsComponent {
	model: any= {};
	error = "";
	success = "";
	emess = false;
	smess = false;
	loading = false;
	resetToken: any = {};

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService , private route: ActivatedRoute) {
		this.toasterService = toasterService;
	}

	ngOnInit() {

	}

	send() {

		this.loading = true;
		let headers = new Headers();
  		headers.append('content-Type', 'application/json');
  		
  		console.log(this.model);

		this.http.post('http://54.161.216.233:8090/api/public/user/contact-us/',
		 this.model, {headers: headers})
			.map((res:Response) => res.json())
			.subscribe(
			    data => {
			    
			    	if(!data.error) {
			    		
			    		this.smess 		= true;
				    	this.success 	= "Request received successfully! Will back to you sortly!";
			    		this.toasterService.pop('success', 'Success',
			    		this.success);
			    		this.loading = false;
			    		this.model = {};
			    		
			    	} else {
			    		this.emess 	 	= true;
				    	this.error 	= data.message;
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.error);
				    	this.loading 	= false;
				    }
				},
			    error => {console.log(error);
			    	
			    	error = error.json();
			    	
				    this.emess= true;
				    this.error= error.error; 
				     this.toasterService.pop('error', 'Error',
			    		 this.error);
				    this.loading = false;
				}
			 );
	}
}	