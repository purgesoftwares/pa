import {Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'coupon-cmp',
	templateUrl: 'coupon.component.html'
})

export class CouponComponent {
	coupons;
	pager: any = {};
	terms:string = '';
    pagedItems: any[];
    message: any= {};
	mess = false;
	succ = false;
	isJoinedFriends = false;
	joinedFriends;
	token = localStorage.getItem('access_token');
	latitude = localStorage.getItem('latitude');
	
	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		
		console.log(localStorage.getItem('joinedfriends'));
		if(localStorage.getItem('joinedfriends') != ""){
			this.isJoinedFriends = true;
			this.joinedFriends = JSON.parse(localStorage.getItem("joinedfriends"));

		}
		console.log(this.isJoinedFriends);
		this.http.get('http://54.161.216.233:8090/api/secured/user/current-customer?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data.addressId || (this.latitude && this.latitude != "" && this.latitude != null)) {
                  				
                  			} else {
                      			
                      			this.toasterService.pop('error', 'Set Location',
			    		 'Set Location first to check nearby Coupons!');
			    		 		this.router.navigate(['/dashboard/location']);
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}},
  					() => console.log("complete")
  				);


  		var thisObj = this;
		this.http.get('http://54.161.216.233:8090/api/secured/coupon-package?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { 

  						if(data.content.length) {
                  				thisObj.coupons= data.content;
                  				this.coupons= data.content;
                  				if(thisObj.isJoinedFriends){

                  					thisObj.coupons.forEach(function(value, index){
                  					var count = 0;
                  					console.log(value); 
                  					if(thisObj.joinedFriends != null 
                  						|| thisObj.joinedFriends != undefined ){

	                  						thisObj.joinedFriends.forEach(function(jv, j){
	                  					
		                  						if(value.couponNumber
		                  							== parseInt(jv.couponNumber)){
		                  							count++;
		                  						}
		                  					});
	                  					var coupon = thisObj.coupons[index];
	                  					coupon["count"] = count;
                  						thisObj.coupons[index] = coupon;
                  					}
                  					});
                  				}
  								//this = thisObj;
                  			} else {
                      			this.mess=true;
                      			this.message= "There is no records found.";
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}},
  					() => console.log("complete")
  				);
	}

	view(id) {
		
		this.router.navigate(['/dashboard/coupon-package-view/'],{ queryParams: { id:id}})
	}

	buy(id : number) {
		console.log(id);
		this.router.navigate(['dashboard/coupon-cart'], { queryParams: { id:id}});
	}

	joinFriend(id, couponNumber) {
		console.log(id);
		this.router.navigate(['dashboard/join-friend'], { queryParams: { Id:id,CouponNumber:couponNumber}});
	}

	/*search(terms: string) {
		if(terms) {
			this.coupons = this.coupons.filter(item => item.couponNumber.startsWith(terms));
		} else {
			this.ngOnInit();
		}
	}*/
   
    /*setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.coupons.length, page);
        this.pagedItems = this.coupons.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }*/  
}
