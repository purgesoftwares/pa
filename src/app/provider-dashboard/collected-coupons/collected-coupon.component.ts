import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'

@Component({
	moduleId: module.id,
	selector: 'collected-coupon-cmp',
	templateUrl: 'collected-coupon.component.html'
})

export class CollectedCouponComponent {
	products;
	pager: any = {};
	model: any = {};
	terms:string = '';
    pagedItems: any[];
    message: any = {};
	mess = false;
	succ = false;
	providerId:string= "";
	token = localStorage.getItem('access_token');
	
	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		this.http.get('http://54.161.216.233:8090/api/secured/user/current-provider?access_token=' + this.token)
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
						this.providerId = data.id;

						var thisObj = this;
					this.http.get('http://54.161.216.233:8090/api/secured/collect-coupon/provider-total-coupons/' 
						+ this.providerId + '?access_token=' + this.token)
			  				.map(res => res.json())
			  				.subscribe(
			  					data => { 

		  							if(data.content.length) {
		                  				
		  								this.model = data;
		  								this.products = data.content;
		                  			} else {
		                      			this.mess 	=	true;
		                      			this.message= "There is no records found.";
		                      			this.model = {};
		                      			//this.products = {};
		                      			this.products = null;
		                  			}
		                  		},
			  					error => { if(error.json().error) {
												this.message = error.json().message;
												this.mess = true;
											}},
			  					() => console.log("complete")
			  				);

              	},
				error => { 
					if(error == "Unauthorized"){
						this.toasterService.pop('error', 'Unauthorized',
						 "Session expired or invalid access.");
						this.router.navigate(['/provider-login']);
            			return false;
					}
					if(error.json().error) {
							this.message = error.json().message;
							this.mess = true;
						}},
				() => console.log("complete")
				);


  		
	}


	add() {
		this.router.navigate(['/provider-dashboard/add-product']);
	}
	edit(id) {
		this.router.navigate(['/provider-dashboard/add-product'], { queryParams: { id:id}});
	}

	view(id) {
		
		this.router.navigate(['/dashboard/coupon-package-view/'],{ queryParams: { id:id}})
	}

	search(terms: string) {
		console.log(terms);
		if(terms) {
			console.log(terms);
			this.products = this.products.filter((item) => item.couponNumber.toString().startsWith(terms));
		} else {
			this.ngOnInit();
		}
	}

	delete(id : number) {
		if (confirm("Are You Sure! You want to delete this Product?") == true) {
			this.http.delete('http://54.161.216.233:8090/api/secured/product/' + id +'?access_token=' + this.token)
				.map(res => res.json())
				.subscribe(
					data => {
								this.ngOnInit();
								this.succ = true;
								this.message = "Record successfully deleted";

								this.toasterService.pop('success', 'Success', this.message);


								setTimeout(() => {
                					this.succ = false;
            					}, 1000);
							},
					error => console.log("error"),
	  				() => console.log("complete")
				);
		}
	}
   
    /*setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.products.length, page);
        this.pagedItems = this.products.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }*/  
}
