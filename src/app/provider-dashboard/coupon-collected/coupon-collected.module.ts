import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CouponCollectedComponent } from './coupon-collected.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [CouponCollectedComponent ],
    exports: [CouponCollectedComponent]
})

export class CouponCollectedModule { }
