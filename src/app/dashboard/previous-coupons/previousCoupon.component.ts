import {Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'previous-coupon-cmp',
	templateUrl: 'previousCoupon.component.html'
})

export class PreviousCouponComponent {
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
		this.http.get('http://54.161.216.233:8090/api/secured/purchased-package/my?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { 

  						if(data.content.length) {
                  				thisObj.coupons= data.content;
                  				this.coupons= data.content;
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

	view(id,couponCode,couponNumber,price,providerId,used,availability, startTime, endTime) {
		
		this.router.navigate(['/dashboard/coupon-view/'],{ queryParams: { Id:id,CouponCode:couponCode,CouponNumber:couponNumber,Price:price,ProviderId:providerId,Used:used,availability: availability,startTime:startTime, endTime:endTime}})
	}

	viewDetails(id) {
		this.router.navigate(['/dashboard/coupon-details/'],{ queryParams: { id:id}})
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
