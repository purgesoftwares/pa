import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { PreviousCouponComponent } from './previousCoupon.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [PreviousCouponComponent ],
    exports: [PreviousCouponComponent]
})

export class PreviousCouponModule { }
