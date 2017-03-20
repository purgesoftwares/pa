import {GoogleMapsAPIWrapper} from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive,  Input, Output} from '@angular/core';
declare var google: any;

@Directive({
  selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
  @Input() origin: any;
  @Input() destination:any;
  @Input() originPlaceId:any;
  @Input() destinationPlaceId:any;
  @Input() waypoints:any;
  @Input() directionsDisplay:any;
  @Input() estimatedTime : any;
  @Input() estimatedDistance : any;


  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  ngOnInit(){
  	/*console.log("cameIN");
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

    });*/
  }


  updateDirections(){
    this.gmapsApi.getNativeMap().then(map => {
             /* if(!this.originPlaceId || !this.destinationPlaceId ){
                return;
              }*/
              console.log(this.origin);
              console.log(this.destination);
              var directionsService = new google.maps.DirectionsService;
              var directionsDisplay = new google.maps.DirectionsRenderer;
              //var mo = {lat: parseFloat(this.origin.latitude), lng: parseFloat(this.origin.longitude)};
              //console.log(mo);
              var me = this;
              //var latLngA = new google.maps.LatLng({lat: this.origin.latitude, lng: this.origin.longitude });
              //var latLngB = new google.maps.LatLng({lat: this.destination.latitude, lng: this.destination.longitude });
              directionsDisplay.setMap(map);
              directionsDisplay.setOptions({
                polylineOptions: {
                            strokeWeight: 8,
                            strokeOpacity: 0.7,
                            strokeColor:  '#00468c' 
                        }
                });
              directionsDisplay.setDirections({routes: []});
              directionsService.route({
                      /*origin: {placeId : this.originPlaceId },
                      destination: {placeId : this.destinationPlaceId },*/
                      origin: {lat: parseFloat(this.origin.lattitude), lng: parseFloat(this.origin.longitude)},
                      destination: {lat: parseFloat(this.destination.lattitude), lng: parseFloat(this.destination.longitude)},
                      avoidHighways: true,
                      travelMode: google.maps.DirectionsTravelMode.DRIVING
                      //travelMode: 'DRIVING'
                    }, function(response: any, status: any) {
                                if (status === 'OK') {
                                  directionsDisplay.setDirections(response);
                                  map.setZoom(30);
                                  //console.log(me.getcomputeDistance (latLngA, latLngB));
                                  var point = response.routes[ 0 ].legs[ 0 ];
                                  me.estimatedTime = point.duration.text ;
                                  me.estimatedDistance = point.distance.text;
                                  console.log(me.estimatedTime);
                                  console.log( 'Estimated travel time: ' + point.duration.text + ' (' + point.distance.text + ')' );
 
                                } else {
                                  console.log('Directions request failed due to ' + status);
                                }
              });
    });
 
  }
 
  private getcomputeDistance(latLngA: any , latLngB: any ) 
  {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }


}