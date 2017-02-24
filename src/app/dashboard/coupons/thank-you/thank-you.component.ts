import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
 
@Component({
	moduleId: module.id,
    selector: 'thank-you',
	templateUrl: 'thank-you.component.html'
})

export class ThankYouComponent {
	model: any= {};
	page: any= {};
	customer: any= {};
	message: any= {};
	mess = false;
	loading = false;
	isJoinedFriends = false;
	joinedFriends;

	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http,
				private route: ActivatedRoute,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {

		this.route.queryParams.subscribe(data => {this.model.id =  data['id']});

		this.http.get('http://54.161.216.233:8090/api/secured/user/current-customer?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => {
  						console.log(data); 
  						if(data.id) {
  								
                  				this.customer = data;
                  				
                  			} else {
                      			this.toasterService.pop('error', 'Invalid Request',
			    		 		'No Records');
			    		 		this.router.navigate(['/']);
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
										this.toasterService.pop('error', 'Invalid Request',
				    		 		this.message);
				    		 		this.router.navigate(['/']);
								}},
  					() => console.log("complete")
  				);
	}

	viewDetails(id) {
		this.router.navigate(['/dashboard/coupon-details/'],{ queryParams: { id:id}})
	}

	sendToAnother(id) {
		this.router.navigate(['/dashboard/send-another-email/'],{ queryParams: { id:id}})
	}



}
