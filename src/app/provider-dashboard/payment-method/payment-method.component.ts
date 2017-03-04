import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'payment-method-cmp',
	templateUrl: 'payment-method.component.html'
})

export class PaymentMethodComponent {
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
		this.http.get('http://54.161.216.233:8090/api/secured/user/current-provider?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data && data.id) {
                  				this.model = { 	providerId: data.id	};


  								this.http.get(
  									'http://54.161.216.233:8090/api/secured/bank-detail/get-bankdetail/'
  									+data.id+'?access_token=' 
  									+ this.token)
					  				.map(res => res.json())
					  				.subscribe(
					  					data => { 

					  					if(data && data.id) {
											var providerId = this.model.providerId;
			                  				this.model = data;
			                  				this.model.providerId = providerId;
			  
			                  			} else {
			                      			console.log(data);
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

		console.log(this.model);
		this.loading = true;
		
		let headers = new Headers();
  		headers.append('content-Type', 'application/json');

  		if(this.model.id){
  			this.http.put('http://54.161.216.233:8090/api/secured/bank-detail/'
  				+ this.model.id + '?access_token=' + this.token, this.model, {headers: headers})
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 

			    	if(data.status == 200) {
			    		this.model = data.json();
			    		this.toasterService.pop('success', 'Success',
			    		 'Successfully updated!');
						this.loading = false;
			    	} else {
			    		this.mess= true;
				    	this.message= 'Value is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;
				    }
				},
			    error => {
			    	console.log(error);
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
  		}else{
  			this.http.post('http://54.161.216.233:8090/api/secured/bank-detail/?access_token=' 
  				+ this.token, this.model, {headers: headers})
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 

			    	if(data.status == 200) {
			    		this.model = data.json();
			    		this.toasterService.pop('success', 'Success',
			    		 'Successfully updated!');
						this.loading = false;
			    	} else {
			    		this.mess= true;
				    	this.message= 'Value is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;
				    }
				},
			    error => {
			    	console.log(error);
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
}
