import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
//import {MomentModule} from 'angular2-moment'

import { CouponDetailsComponent } from './coupon-details.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [CouponDetailsComponent ],
    exports: [CouponDetailsComponent]
})

export class CouponDetailsModule { }
