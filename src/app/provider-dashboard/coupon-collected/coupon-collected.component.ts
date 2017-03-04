import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'coupon-collected-cmp',
	templateUrl: 'coupon-collected.component.html'
})

export class CouponCollectedComponent {
	model: any= {};
	id: number;
	message: any= {};
	mess = false;
	loading = false;

	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, private route: ActivatedRoute,
				toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {

		this.route.queryParams.subscribe(data => {this.id =  data['id']});


		this.http.get('http://54.161.216.233:8090/api/secured/purchased-package/'
			+this.id+'?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data && data.id) {
                  				this.model = data.customer;
                  			} else {
                      			this.mess 		=	true;
                      			this.message	= 	"There is no user records found.";
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}},
  					() => console.log("complete")
  				);
	}

    popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

	ok() {

		this.toasterService.pop('success', 'Success',
		 'Thank you!');

		this.router.navigate(['/provider-dashboard']);
		
	} 
}
