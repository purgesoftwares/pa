import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'privacy-cmp',
	templateUrl: 'privacy.component.html'
})

export class PrivacyComponent {
	id: number;
	model: any= {};
	message: any= {};
	mess = false;
	loading = true;

	private toasterService: ToasterService;

	constructor( private http : Http, private route: ActivatedRoute,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		this.route.queryParams.subscribe(data => {this.id =  data['Id']});

		this.http.get('http://54.161.216.233:8090/api/pages/589c0ba322a9cf5e95adfc94')
  				.map(res => res.json())
  				.subscribe(
  					data => { if(data.id) {
                  				this.model = data;
  
                  			} else {
                      			this.mess 		=	true;
                      			this.message	= 	"There is no records found.";
                  			}},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}},
  					() => console.log("complete")
  				);
	}

	onChange() {
		this.loading= !this.loading;
	}

    popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

}
