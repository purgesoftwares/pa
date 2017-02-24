import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'send-another-email-cmp',
	templateUrl: 'send-another-email.component.html'
})

export class SendAnotherEmailComponent {
	id: number;
	model: any= {};
	message: any= {};
	mess = false;
	joinedFriends: Array<Object> = [];
	keyArr: any = [];
	loading = true;

	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;

	constructor( private http : Http, private route: ActivatedRoute,
		private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		this.route.queryParams.subscribe(data => {
			this.id =  data['id'],
			this.model.id =  data['id'],
			this.model.couponNumber = data['CouponNumber']
		});

	}

	sendEmail() {

    	if(this.model) {

    		this.http.get('http://54.161.216.233:8090/api/secured/purchased-package/' 
    			+ this.model.id + '/' + this.model.email + '?access_token=' + this.token)
  				.map(res => res.text())
  				.subscribe(
  					data => {
  						//console.log(data); 
  						if(data == "success") {
  								
                  				this.toasterService.pop('success', 'Sent Successfully!',
			    		 		'Email Sent Successfully!');
			    		 		this.router.navigate(['/dashboard/thank-you'], { queryParams: { id:this.model.id } } );
                  				
                  			} else {
                      			this.toasterService.pop('error', 'Invalid Request',
			    		 		'No Records');
			    		 		this.router.navigate(['/']);
                  			}},
  					error => { console.log(error); /*if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
									this.toasterService.pop('error', 'Invalid Request',
				    		 		this.message);
								}*/
								this.toasterService.pop('error', 'Some Error',
				    		 		"Error In sending Email! Please try later.");
						},
  					() => console.log("complete")
  				);
    	} else {
    		this.mess= true;
	    	this.message= 'Invalid Value';
	    	this.toasterService.pop('error', 'Invalid', this.message);
	    	this.loading = false;
	    }
	}
}
