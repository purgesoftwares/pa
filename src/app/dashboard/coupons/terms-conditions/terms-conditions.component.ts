import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery';

//declare var $:JQueryStatic;

declare const PAYPAL: any;

@Component({
	moduleId: module.id,
	selector: 'terms-cmp',
	templateUrl: 'terms-conditions.component.html'
})

export class TermConditionComponent {
	id: number;
	model: any= {};
	customer: any= {};
	package : any= {};
	purchasedPackage : any= {};
	message: any= {};
	mess = false;
	loading = true;
	accepted = true;
	isJoinedFriends = false;
	joinedFriends;
	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http, private route: ActivatedRoute,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}


	ngOnInit() {
		this.package.quantity = 1;
		if(localStorage.getItem('joinedfriends') != ""){
			this.isJoinedFriends = true;
			this.joinedFriends = JSON.parse(localStorage.getItem("joinedfriends"));
			if(this.joinedFriends)
			this.package.quantity += this.joinedFriends.length;

		}

		this.route.queryParams.subscribe(data => {this.id =  data['id']});

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

	this.http.get('http://54.161.216.233:8090/api/secured/user/current-customer?access_token=' + this.token)
  				.map(res => res.json())
  				.catch(e => {
					console.log(e);
		            if (e.status === 401 || e.status === 0) {
		                return Observable.throw('Unauthorized');
		            }
		            // do any other checking for statuses here
		        })
  				.subscribe(
  					data => {
  						console.log(data); 
  						if(data.id) {
  								
                  				this.customer = data;
                  				this.purchasedPackage.customer = this.customer;
                  				this.purchasedPackage.customerId = this.customer.id;
                  				
                  			} else {
                      			this.toasterService.pop('error', 'Invalid Request',
			    		 		'No Records');
			    		 		this.router.navigate(['/']);
                  			}},
  					error => { 
  						if(error == "Unauthorized"){
							this.toasterService.pop('error', 'Unauthorized',
							 "Session expired or invalid access.");
							this.router.navigate(['/login']);
	            			return false;
						}

  						if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
										this.toasterService.pop('error', 'Invalid Request',
				    		 		this.message);
				    		 		this.router.navigate(['/']);
								}},
  					() => console.log("complete")
  				);


  		this.http.get('http://54.161.216.233:8090/api/secured/coupon-package/'+this.id 
  			+ "?access_token=" + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data.id) {
  								var quantity = this.package.quantity;
                  				this.package = data;
                  				this.purchasedPackage.couponNumber = this.package.couponNumber;
                  				this.purchasedPackage.couponPackage = this.package;

                  				var joinedfriends = JSON.parse(localStorage.getItem("joinedfriends"));
                  				var newJoinedFriends = [];
                  				var that1 = this;
                  				if(joinedfriends && joinedfriends!=null){
                  					joinedfriends.forEach(function(jv, j){
                  						jv.couponNumber = that1.package.couponNumber;
	                  					newJoinedFriends.push(jv);
		                  			});	
                  				}
                  				
                  				this.purchasedPackage.joinedFriends = newJoinedFriends;
                  				this.purchasedPackage.createdAt = new Date();
                  				this.package.quantity = quantity;
                  				this.package.totalPrice = this.package.quantity*(parseFloat(this.package.price));
                  				console.log(this.package);
                  				console.log(this.package.totalPrice);
								/*  this.purchasedPackage = {
  									"couponNumber": this.package.couponNumber,
  									"couponPackage": this.package,
  									"joinedFriends": JSON.parse(localStorage.getItem("joinedfriends")),
  									"customerId": "",
  									"custome": null,
  									"createdAt": new Date()
  								}; */
							var that = this;
						    
						    
						    $.getScript( "https://www.paypalobjects.com/api/checkout.js", function( data, textStatus, jqxhr ) {
							/*  console.log( data ); // Data returned
							  console.log( textStatus ); // Success
							  console.log( jqxhr.status ); // 200
							  console.log( "Load was performed." );*/
							  	PAYPAL.Button.render({

							        env: 'sandbox', // Specify 'sandbox' for the test environment

							        client: {
							            sandbox:'AVsoN1gspbuDNVnJAs3LJq6Q0E1TpZj4ecUh4umKBfT3O_zv3YxELUkipkYpEfeSqbC9_R1rkkcXJUI-',
							            //sandbox:    'AXvLRfch7m8LoA-H5D3WrbdA8ZRgkhwGBUjkcRugHpfhvjiijgE-117R16tJG4oRpln71OfzIgsp28Y8',
							            production: 'xxxxxxxxx'
							        },
							        onClick: function(){
							        	console.log("on-click");
							        	return false;
							        },
							        payment: function() {
							            // Set up the payment here, when the buyer clicks on the button
							            var env    = this.props.env;
							            var client = this.props.client;
							            console.log(that.accepted);
							            console.log(that.model.totalPrice);
							            console.log(this.package);

							            if(that.accepted){
							            	alert("Please accept Terms and Conditions before payment.");
							            	return false;
							            }else{
							            	
								            return PAYPAL.rest.payment.create(env, client, {
								                transactions: [
								                    {
								                        amount: { total: that.package.totalPrice, currency: 'USD' }
								                    }
								                ]
								            });
							            }
							        
							        },

							        commit: true, // Optional: show a 'Pay Now' button in the checkout flow


							        onAuthorize: function(data, actions) {
							        	console.log(data);
							        	console.log(actions);
							        	return actions.payment.execute().then(function() {
							                // Show a success page to the buyer
							                console.log(data);
							        		console.log(actions);
							        		that.saveOrder();
							            });
							            // Execute the payment here, when the buyer approves the transaction
							       }
							            
							    }, '#paypal-button');

							  	
							});


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

			    		this.router.navigate(['/dashboard/order-confirm/'],{ queryParams: { id:data.id}});

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
