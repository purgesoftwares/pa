import {Component, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SebmGoogleMap } from 'angular2-google-maps/core';


@Component({
	moduleId: module.id,
	selector: 'location-cmp',
	templateUrl: 'location.component.html'
})

export class LocationComponent {
	public latitude;
	public longitude;
	public searchControl: FormControl;
  public zoom: number;
	public selecting = true;

	@ViewChild("search")
	public searchElementRef: ElementRef;

  private toasterService: ToasterService;

	constructor(
      private http : Http,
      private router: Router,
	    private mapsAPILoader: MapsAPILoader,
	    private ngZone: NgZone,
      toasterService: ToasterService
	) {
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

  private save() {
    localStorage.setItem('latitude', this.latitude);
    localStorage.setItem('longitude', this.longitude);

    this.toasterService.pop('success', 'Success',
               'Location saved!');
              this.router.navigate(['/dashboard/coupon']);
  }


}
