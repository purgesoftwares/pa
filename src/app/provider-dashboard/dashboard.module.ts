import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from "angular2-google-maps/core";

import { ProviderHomeModule } from './home/home.module';
import { ProviderProfileModule } from './profile/profile.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { ProviderInfoModule } from './provider-info/provider-info.module';
import { CouponCollectedModule } from './coupon-collected/coupon-collected.module';
import { CollectCouponModule } from './collect-coupon/collect-coupon.module';
import { ProductModule } from './products/product.module';
import { CollectedCouponModule } from './collected-coupons/collected-coupon.module';
import { OpeningDayModule } from './opening-days/opening-day.module';

import { ProviderDashboardComponent } from './dashboard.component';

import {ProviderTopNavComponent} from '../shared/index';
import {ProviderSidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyAGMdOZPvWC-k__DNkAk9aGkPZ8x7OIGeY",
          libraries: ["places"]
        }),
    	ProviderHomeModule,
        ProviderProfileModule,
        PaymentMethodModule,
        ProviderInfoModule,
        CouponCollectedModule,
        CollectCouponModule,
        ProductModule,
        CollectedCouponModule,
        OpeningDayModule
    ],
    declarations: [ProviderDashboardComponent, ProviderTopNavComponent, ProviderSidebarComponent],
    exports: [ProviderDashboardComponent, ProviderTopNavComponent, ProviderSidebarComponent]
})

export class ProviderDashboardModule { }
