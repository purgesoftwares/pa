import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
 
@Component({
	moduleId: module.id,
    selector: 'coupon-view',
	templateUrl: 'coupon-view.component.html'
})

export class CouponViewComponent {
	model: any={};
	token:any[];
	providers: Array<Object>[];

	token = localStorage.getItem('access_token');
	constructor(private route: ActivatedRoute, private http: Http) {}

	ngOnInit() {
	   this.route.queryParams.subscribe(data => {this.model.id =  data['id'],this.model.couponCode =
	   														data['CouponCode'],this.model.couponNumber =
	   														data['CouponNumber'],this.model.price =  
	   														data['Price'],this.model.providerId =  
	   														data['ProviderId'],this.model.used =  
	   														data['Used'],this.model.availability = data['availability'],this.model.startTime =  
	   														data['startTime'],this.model.endTime =  
	   														data['endTime']});

	   	this.http.get('http://54.161.216.233:8090/api/secured/provider?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => {this.providers= data.content;
  						for(var i=0; i<this.providers.length; i++ ) {
  							if(this.providers[i].id == this.model.providerId) {
  								this.model.provider = this.providers[i].provider_name;
  							}
  						}
  					},
  					error => console.log("error"),
  					() => console.log("complete")
  				);
  	}
}
