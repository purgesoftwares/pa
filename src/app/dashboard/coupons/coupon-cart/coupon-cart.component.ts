import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
 
@Component({
	moduleId: module.id,
    selector: 'coupon-cart',
	templateUrl: 'coupon-cart.component.html'
})

export class CouponCartComponent {
	model: any= {};
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

		this.model.quantity = 1;
		if(localStorage.getItem('joinedfriends') != ""){
			this.isJoinedFriends = true;
			this.joinedFriends = JSON.parse(localStorage.getItem("joinedfriends"));
			if(this.joinedFriends)
			this.model.quantity += this.joinedFriends.length;

		}

		this.route.queryParams.subscribe(data => {this.model.id =  data['id']});


		this.http.get('http://54.161.216.233:8090/api/secured/coupon-package/'
			+ this.model.id + '?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => {
  						console.log(data); 
  						if(data.id) {
  								var quantity  = this.model.quantity;
                  				this.model = data;
                  				this.model.quantity = quantity;
                  				this.model.totalPrice = quantity*(parseFloat(this.model.price));
  
                  			} else {
                      			this.toasterService.pop('error', 'Invalid Request',
			    		 		'No Records!');
			    		 		this.router.navigate(['/dashboard/coupon']);
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
									this.toasterService.pop('error', 'Invalid Request',
				    		 		this.message);
				    		 		this.router.navigate(['/dashboard/coupon']);
								}},
  					() => console.log("complete")
  				);
	}

	confirmPaypal(id) {
		
		this.router.navigate(['/dashboard/terms-conditions/'],{ queryParams: { id:id}})
	}


}
