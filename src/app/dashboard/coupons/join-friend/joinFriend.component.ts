import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'joinFriend-cmp',
	templateUrl: 'joinFriend.component.html'
})

export class JoinFriendComponent {
	id: number;
	model: any= {};
	message: any= {};
	mess = false;
	joinedFriends: Array<Object> = [];
	keyArr: any = [];
	loading = true;

	private toasterService: ToasterService;

	constructor( private http : Http, private route: ActivatedRoute,
		private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		this.route.queryParams.subscribe(data => {
			this.id =  data['Id'],
			this.model.couponNumber = data['CouponNumber']
		});

	}

	savefriend() {

    	if(this.model) {

			this.joinedFriends = JSON.parse(localStorage.getItem('joinedfriends'));
			if(!Array.isArray(this.joinedFriends)){ this.joinedFriends = []; }
			this.joinedFriends.push(this.model);
			localStorage.setItem('joinedfriends', JSON.stringify(this.joinedFriends) );
			/*var getjoinfriend = JSON.parse(localStorage.getItem('joinedfriends'));
			for (var i in getjoinfriend)
			{
				if ( getjoinfriend[i].name == 'Raj' ) {
			 	 console.log(getjoinfriend[i].name);
				}
			}*/


    		this.toasterService.pop('success', 'Success', 'Successfully Joined.');
	    	this.router.navigate(['/dashboard/coupon']);
    	} else {
    		this.mess= true;
	    	this.message= 'Something wrong. Please try again;';
	    	this.toasterService.pop('error', 'Invalid', this.message);
	    	this.loading = false;
	    }
	}
}
