import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'help-cmp',
	templateUrl: 'help.component.html'
})

export class HelpComponent {
	model: any= {};
	message: any= {};
	mess = false;
	loading = false;

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService ) {
		this.toasterService = toasterService;
	}

	ngOnInit() {
		this.http.get('http://54.161.216.233:8090/api/pages/589c0b8522a9cf5e95adfc92')
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

    popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

}
