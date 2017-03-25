import {Component, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserService } from './../../user.service';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin'
import {QRCodeComponent} from 'angular2-qrcode';


@Component({
	moduleId: module.id,
	selector: 'qrcode-cmp',
	templateUrl: 'qrcode.component.html',
  providers : [ QRCodeComponent ]
})

export class QrcodeComponent {
  public model: any = {};
  message: any= {};
  mess = false;
  loading = false;
  token = localStorage.getItem('access_token');

  private toasterService: ToasterService;

  
	constructor(
      private http : Http,
      private router: Router,
	    
      private route: ActivatedRoute, 
      toasterService: ToasterService, 
      private location: Location
	) {
    this.toasterService = toasterService;
  }

  goBack() {
        this.location.back();
    }

	ngOnInit() {

    console.log(this);
    this.route.params.subscribe(data => { this.model.code =  data['code'] } );

  
    }


}
