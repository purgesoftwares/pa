import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CouponComponent } from './coupon.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [CouponComponent ],
    exports: [CouponComponent]
})

export class CouponModule { }
