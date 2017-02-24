import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
 
@Component({
	moduleId: module.id,
    selector: 'coupon-details-cmp',
	templateUrl: 'coupon-details.component.html'
})

export class CouponDetailsComponent {
	model: any={};
	customer: any={};
	providers: Array<Object>[];
	coupons: Array<Object>[];

	token = localStorage.getItem('access_token');
	private toasterService: ToasterService;


	constructor(private route: ActivatedRoute, 
		 toasterService: ToasterService ,
		 private router: Router, private http: Http) {}

	ngOnInit() {
	   this.route.queryParams.subscribe(data => {this.model.id =  data['id'] } );

	   	this.http.get('http://54.161.216.233:8090/api/secured/user/current-customer/?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(

  					data => {console.log(data); this.customer 	= data },
  					error => console.log("error"),
  					() => console.log("complete")
  				);

	   	this.http.get('http://54.161.216.233:8090/api/secured/purchased-package/'
	   		+ this.model.id +'?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(

  					data => {
  						if(this.customer.id != data.customerId){
  							this.toasterService.pop('error', 'Invalid Request',
				    		 		"Choose a right tour");
				    		 		this.router.navigate(['/dashboard/previous-coupons']);
  						}
  						console.log(data); this.model = data },
  					error => console.log("error"),
  					() => console.log("complete")
  				);

  		this.http.get('http://54.161.216.233:8090/api/secured/coupon/find-by-purchased/'
  			+ this.model.id +'?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(

  					data => {
  						this.coupons = data;
  						console.log(this); },
  					error => console.log("error"),
  					() => console.log("complete")
  				);


  	}

  	
}
