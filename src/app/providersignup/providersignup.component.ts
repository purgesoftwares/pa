import {Component, ElementRef } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NgZone, OnInit, ViewChild } from '@angular/core';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import * as $ from 'jquery';
/**
*	This class represents the lazy loaded SignupComponent.
*/

declare const FB:any;

declare const gapi: any;

@Component({
	moduleId: module.id,
	selector: 'providersignup-cmp',
	templateUrl: 'providersignup.component.html'
})

export class ProviderSignupComponent { 
	model: any= {};
	user: any= {};
	guser: any= {};
	objThis: any= {};
	message: any= {};
	mess = false;
	loading = false;


	public latitude;
	public longitude;
	public searchControl: FormControl;
  	public zoom: number;
	public selecting = true;

	@ViewChild("address")
	public searchElementRef: ElementRef;

	private toasterService: ToasterService;

	constructor( private http : Http,
				private router: Router, toasterService: ToasterService,
				private mapsAPILoader: MapsAPILoader,
				private ngZone: NgZone ) {
		this.toasterService = toasterService;
		
	}


	ngOnInit() {
	    //set google maps defaults
	    this.zoom = 4;
	    this.latitude = 39.8282;
	    this.longitude = -98.5795;
	    this.selecting = true;

	    //create search FormControl
	    this.searchControl = new FormControl();

	    //set current position
	    this.setCurrentPosition();

	    //load Places Autocomplete
	    this.mapsAPILoader.load().then(() => {
	      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
	        types: ["address"]
	      });
	      autocomplete.addListener("place_changed", () => {
	        this.ngZone.run(() => {
	          //get the place result
	          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

	          console.log(place);
	          this.model.address = place.formatted_address;
	          //verify result
	          if (place.geometry === undefined || place.geometry === null) {
	            return;
	          }
	          console.log(place);

	          //set latitude, longitude and zoom
	          this.latitude = place.geometry.location.lat();
	          this.longitude = place.geometry.location.lng();
	          this.zoom = 12;
	          this.selecting = false;
	        });
	      });
	    });
	 }


	private setCurrentPosition() {

	    if ("geolocation" in navigator) {
	      navigator.geolocation.getCurrentPosition((position) => {
	        console.log(position);
	        this.latitude = position.coords.latitude;
	        this.longitude = position.coords.longitude;
	        this.zoom = 12;
	        this.selecting = false;
	      });
	    }

	  }

 



	signup() {

		//this.loading = true;
		console.log(this.model);

		if(this.model.password != this.model.confirmPassword){
			this.toasterService.pop('error', 'Mismatch',
			    		 "Password and Confirm Password did not match.");
			$("confirmPassword").focus();
		}
		this.http.post('http://54.161.216.233:8090/api/provider/signup', this.model)
			//.map((res:Response) => res.text())
			.subscribe(
			    data => { 
			    		console.log(data);

			    	if(data.status == 200) {
			    		var datamodel = JSON.stringify(eval("(" + data.text() + ")"));
			    		console.log(datamodel);
			    		this.toasterService.pop('success', 'Success',
			    		 'Your account successfully created! Login to access');
			    		//localStorage.setItem('access_token', data);
				    	this.router.navigate(['/provider-login']);
			    	} else {this.mess= true;
				    	this.message= 'Value is incorrect';
				    	this.toasterService.pop('error', 'Invalid',
			    		 this.message);
				    	this.loading = false;
				    }
				},

			    error => {console.log(error);
			    	error = error.json();
				    this.mess= true;
				    this.message= 'Some Error! Please Try After Some Time '; 
				    if(error.error)
				    this.message= error.error; 
				    this.toasterService.pop('error', 'Error',
			    		 this.message);
				    this.loading = false;

				}
			 );
	}
}
