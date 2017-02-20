import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'terms-cmp',
	templateUrl: 'terms-conditions.component.html'
})

export class TermConditionComponent {
	id: number;
	model: any= {};
	package : any= {};
	purchasedPackage : any= {};
	message: any= {};
	mess = false;
	loading = true;
	accepted = true;
	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http, private route: ActivatedRoute,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}


	ngOnInit() {
		this.route.queryParams.subscribe(data => {this.id =  data['Id']});

		this.http.get('http://54.161.216.233:8090/api/pages/58a2fab122a9cf32bf047bda')
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data.id) {
                  				this.model = data;
  
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

  		this.http.get('http://54.161.216.233:8090/api/secured/coupon-package/'+this.id 
  			+ "?access_token=" + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data.id) {
                  				this.package = data;
  								this.purchasedPackage = {
  									"couponNumber": this.package.couponNumber,
  									"couponPackage": this.package,
  									"joinedFriends": JSON.parse(localStorage.getItem("joinedfriends")),
  									"customerId": "",
  									"custome": null,
  									"createdAt": new Date()
  								};

  								console.log(this.purchasedPackage);

                  			} else {
                      			this.mess 		=	true;
                      			this.message	= 	"Invalid Request! There is no records found.";
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}},
  					() => console.log("complete")
  				);


	}

	saveOrder(){
		let headers = new Headers();
  		headers.append('content-Type', 'application/json');

  		this.http.post('http://54.161.216.233:8090/api/secured/purchased-package/'
  			 + '?access_token=' + this.token, this.purchasedPackage, {headers: headers})
			.map((res) => res.json())
			.subscribe(
			    data => { 
			    	console.log(data);
			    	if(data.id) {
			    		
			    		this.toasterService.pop('success', 'Success',
			    		 'Your order successfully placed!');

			    		this.loading = false;
			    		localStorage.removeItem("joinedfriends");

			    		this.router.navigate(['/dashboard/order-confirm']);

			    	} else {this.mess= true;
				    	this.message= 'Value is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;
				    }
				},
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
	onChange() {
		this.accepted= !this.accepted;
	}

}
