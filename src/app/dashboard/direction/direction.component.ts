import {Component, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
/*import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';*/
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserService } from './../../user.service';
import { DirectionsMapDirective } from './direction.directive';
import { SebmGoogleMap } from 'angular2-google-maps/core';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'


@Component({
	moduleId: module.id,
	selector: 'direction-cmp',
	templateUrl: 'direction.component.html',
  providers : [ GoogleMapsAPIWrapper, DirectionsMapDirective ]
})

export class DirectionComponent {
  public latitude;
	public toLatitude;
  public longitude;
	public toLongitude;
	public searchControl: FormControl;
  public zoom: number;
  public selecting = true;
  public model: any = {};
  public estimatedTime: any;
  public estimatedDistance: any;
  public customer: any = {};
  public provider: any = {};
  public address: any = {};
  public toAddress: any = {};
  message: any= {};
  mess = false;
  loading = false;
  token = localStorage.getItem('access_token');

  public origin = { longitude: 4.333, lattitude: -1.2222 };  // its a example aleatory position
  public destination = { longitude: 22.311, lattitude: -0.123 };  // its a example aleatory position

	@ViewChild("search")
	public searchElementRef: ElementRef;

  private toasterService: ToasterService;

  @ViewChild(DirectionsMapDirective) vc:DirectionsMapDirective;

	constructor(
      private http : Http,
      private router: Router,
	    private mapsAPILoader: MapsAPILoader,
	    private ngZone: NgZone,
      private route: ActivatedRoute, 
      toasterService: ToasterService, 
      private gmapsApi: GoogleMapsAPIWrapper,
      private userService: UserService,
      vc:DirectionsMapDirective,
      private location: Location
	) {
    this.vc = vc;
    this.toasterService = toasterService;
  }

  goBack() {
        this.location.back();
    }

	ngOnInit() {

    console.log(this);
    this.route.queryParams.subscribe(data => { this.provider.id =  data['id'] } );

    if(this.userService.isLoggedIn()){

      this.http.get('http://54.161.216.233:8090/api/secured/user/current-customer?access_token=' + this.token)
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
          if(data) {
                  
            this.customer = data;

              if(this.customer.addressId && this.customer.addressId != null){


                  this.http.get('http://54.161.216.233:8090/api/secured/provider/' 
                    + this.provider.id + '?access_token=' 
                    + this.token)
                      .map(res => res.json())
                      .subscribe(
                        data => { 
                          if(data) {
                              this.provider = data;
                              
                              

                                    
                              this.http.get('http://54.161.216.233:8090/api/secured/address/' 
                                  + this.provider.addressId + '?access_token=' 
                                  + this.token)
                                    .map(res => res.json())
                                    .subscribe(
                                      data => { 
                                        if(data) {
                                            this.toAddress = data;

                                            this.toLatitude = this.toAddress.location.x;
                                            this.toLongitude = this.toAddress.location.y;

                                            this.destination = { longitude: this.toLongitude, 
                                              lattitude: this.toLatitude };

                                            this.http.get('http://54.161.216.233:8090/api/secured/address/' 
                                              + this.customer.addressId + '?access_token=' 
                                              + this.token)
                                                .map(res => res.json())
                                                .subscribe(
                                                  data => { 
                                                    if(data) {
                                                        this.address = data;

                                                        this.latitude = this.address.location.x;
                                                        this.longitude = this.address.location.y;

                                                        this.origin = { longitude: this.longitude, 
                                              lattitude: this.latitude };


                                                        //set google maps defaults
                                                        this.zoom = 4;
                                                        this.latitude = 39.8282;
                                                        this.longitude = -98.5795;
                                                        this.selecting = true;


                                                        //create search FormControl
                                                        this.searchControl = new FormControl();

                                                        //set current position
                                                        //this.setCurrentPosition();

                                                        console.log(this);
                                                        //load Places Autocomplete
                                                        this.mapsAPILoader.load().then(() => {

                                                          this.vc.origin = this.origin;
                                                          this.vc.destination = this.destination;
                                                          this.vc.updateDirections();
                                                          
                                                        });
                                                                                                            
                                                    } 
                                                  },
                                                  error => {

                                                    if(error.json().error) {
                                                        this.message = error.json().message;
                                                        this.toasterService.pop('error', 'Error',
                                                       this.message);
                                                      }
                                                    },
                                                    () => console.log("complete")
                                              );
                                        } 
                                      },
                                      error => {

                                        if(error.json().error) {
                                            this.message = error.json().message;
                                            this.toasterService.pop('error', 'Error',
                                           this.message);
                                          }
                                        },
                                        () => console.log("complete")
                                  );

                          } 
                        },
                        error => {

                          if(error.json().error) {
                              this.message = error.json().message;
                              this.toasterService.pop('error', 'Error',
                             this.message);
                            }
                          },
                          () => console.log("complete")
                    );
              }
            } 
        },
        error => { 

        if(error == "Unauthorized"){
            
          this.toasterService.pop('error', 'Unauthorized',
           "Session expired or invalid access.");

          this.router.navigate(['/login']);
                return false;
        }

        if(error.json().error) {
            this.message = error.json().message;
            this.toasterService.pop('error', 'Error',
           this.message);
          }
        },
          () => console.log("complete")
        );
  
    }

    
/*    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.selecting = true;


    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    console.log(this);
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      this.vc.origin = this.origin;
      this.vc.destination = this.destination;
      this.vc.updateDirections();
      
         this.gmapsApi.getNativeMap().then(map => {
              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer;
              directionsDisplay.setMap(map);
              directionsService.route({
                      origin: {lat: this.origin.latitude, lng: this.origin.longitude},
                      destination: {lat: this.destination.latitude, lng: this.destination.longitude},
                      waypoints: this.waypoints,
                      optimizeWaypoints: true,
                      travelMode: 'DRIVING'
                    }, function(response, status) {
                                if (status === 'OK') {
                                  directionsDisplay.setDirections(response);
                                } else {
                                  window.alert('Directions request failed due to ' + status);
                                }
              });

          });
*/
      /*let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
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
    });*/
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

    if(this.userService.isLoggedIn()){
      this.model.address = $(this.searchElementRef.nativeElement).val();
      this.model.location = { x: this.latitude, y: this.longitude,
               coordinates: [this.latitude, this.longitude], type: "Point"};
      this.model.customerId = this.customer.id;
      this.model.address = {
          "address1": this.model.address,
          "location": this.model.location,
          "city": this.model.city,
          "country": this.model.country,
          "postalCode": this.model.postalCode
      };

      this.http.post('http://54.161.216.233:8090/api/secured/address/update-customer-location?access_token=' 
          + this.token, this.model)
            .map(res => res.json())
            .subscribe(
              data => { 
                if(data) {
                            this.address = data;
                            this.latitude = this.address.location.x;
                            this.longitude = this.address.location.y;
                            $(this.searchElementRef.nativeElement).val(this.address.address1);

                          } 
                        },
              error => {

                if(error.json().error) {
                    this.message = error.json().message;
                    this.toasterService.pop('error', 'Error',
                   this.message);
                  }
                },
                () => console.log("complete")
          );

    } else {

      //console.log(this.model);
      localStorage.setItem('latitude', this.latitude);
      localStorage.setItem('longitude', this.longitude);

      this.toasterService.pop('success', 'Success',
                 'Location saved!');
                this.router.navigate(['/dashboard/coupon']);
    }

  }


}
