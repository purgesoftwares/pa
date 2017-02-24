import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
//import {MomentModule} from 'angular2-moment'

import { CouponPackageViewComponent } from './coupon-package-view.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [CouponPackageViewComponent ],
    exports: [CouponPackageViewComponent]
})

export class CouponPackageViewModule { }
