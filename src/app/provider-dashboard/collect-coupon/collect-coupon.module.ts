import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CollectCouponComponent } from './collect-coupon.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [CollectCouponComponent ],
    exports: [CollectCouponComponent]
})

export class CollectCouponModule { }
