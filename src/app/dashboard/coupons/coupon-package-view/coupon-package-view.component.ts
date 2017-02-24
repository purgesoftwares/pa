import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
 
@Component({
	moduleId: module.id,
    selector: 'coupon-package-view-cmp',
	templateUrl: 'coupon-package-view.component.html'
})

export class CouponPackageViewComponent {
	model: any={};
	providers: Array<Object>[];

	token = localStorage.getItem('access_token');
	constructor(private route: ActivatedRoute, private http: Http) {}

	ngOnInit() {
	   this.route.queryParams.subscribe(data => {this.model.id =  data['id']});

	   	this.http.get('http://54.161.216.233:8090/api/secured/coupon-package/'+ this.model.id +'?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => this.model= data,
  					error => console.log("error"),
  					() => console.log("complete")
  				);
  	}
}
