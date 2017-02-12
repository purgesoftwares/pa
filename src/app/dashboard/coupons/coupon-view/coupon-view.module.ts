import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { CouponViewComponent } from './coupon-view.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [CouponViewComponent ],
    exports: [CouponViewComponent]
})

export class CouponViewModule { }
