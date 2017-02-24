import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { CouponCartComponent } from './coupon-cart.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [CouponCartComponent ],
    exports: [CouponCartComponent]
})

export class CouponCartModule { }
