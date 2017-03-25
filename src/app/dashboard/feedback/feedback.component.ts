import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {RatingModule, Rating} from "ng2-rating";

@Component({
	moduleId: module.id,
	selector: 'feedback-cmp',
	templateUrl: 'feedback.component.html',
	providers : [ Rating ]
})

export class FeedbackComponent {
	model: any= {};
	coupon: any= {};
	provider: any= {};
	message: any= {};
	mess = false;
	loading = false;
	couponId = 0;


	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService,
				private route: ActivatedRoute ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {

		this.model.rank = 3;

		this.route.queryParams.subscribe(data => { console.log(data); this.couponId =  data['id'] } );

		this.route.params.subscribe(params => {
	        console.log(params); this.couponId =  params['id'];
	      });

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
					if(data.id) {
						this.http.get('http://54.161.216.233:8090/api/secured/rate-review/get-feedback/' 
							+ this.couponId + '?access_token=' 
							+ this.token)
							.map(res => res.json())
							
							.subscribe(
								data => { 
									if(!data) {
										this.toasterService.pop('error', 'Unauthorized',
								 "Not a valid request! May be already submited the feedback or not permited.");
										this.router.navigate(['/login']);
									}
								
								this.http.get('http://54.161.216.233:8090/api/secured/coupon/' 
										+ this.couponId + '?access_token=' 
										+ this.token)
										.map(res => res.json())
										
										.subscribe(
											data => { 
												if(!data) {
													this.toasterService.pop('error', 'Unauthorized',
											 "Not a valid request! May be already submited the feedback or not permited.");
													this.router.navigate(['/login']);
												}else {
													this.coupon = data;
													this.provider =	this.coupon.provider;
												}

							      		},
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
												}
											},
											() => console.log("complete")
										);

				      		},
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
									}
								},
								() => console.log("complete")
							);

							/*===========*/

      				this.model = { 	id: data.id,
      								email: data.mainEmail,
      								username: data.fullName
      								};

      			} else {
          			this.mess 		=	true;
          			this.message	= 	"There is no records found.";
      			}
      		},
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
						}},
				() => console.log("complete")
			);
	}

    popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

	save() {

		this.loading = true;
		this.model.providerId = this.coupon.providerId;
		this.model.couponPackageId = this.coupon.couponPackageId;
		this.model.customerId = this.model.id;

		let headers = new Headers();
  		headers.append('content-Type', 'application/json');

  		console.log(this.model);

		this.http.post('http://54.161.216.233:8090/api/secured/rate-review/?access_token=' 
			+ this.token, this.model, {headers: headers})
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 

			    	if(data.status == 200) {
			    		var datamodel = data.json();
			    		this.toasterService.pop('success', 'Success',
			    		 'Rate and feedback successfully submited!');

			    		this.loading = false;

			    		this.router.navigate(['/dashboard']);

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
