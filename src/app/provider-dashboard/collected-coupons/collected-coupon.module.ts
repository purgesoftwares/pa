import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CollectedCouponComponent } from './collected-coupon.component';

@NgModule({
    imports: [ RouterModule, BrowserModule, FormsModule ],
    declarations: [CollectedCouponComponent ],
    exports: [CollectedCouponComponent]
})

export class CollectedCouponModule { }
