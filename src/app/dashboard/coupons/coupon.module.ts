import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CouponComponent } from './coupon.component';
import { CouponPackageViewModule } from './coupon-package-view/coupon-package-view.module';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule, CouponPackageViewModule ],
    declarations: [CouponComponent ],
    exports: [CouponComponent]
})

export class CouponModule { }
