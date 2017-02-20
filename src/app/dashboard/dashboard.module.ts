import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from "angular2-google-maps/core";

import { DHomeModule } from './home/home.module';

import { UserModule } from './users/user.module';
import { LocationModule } from './location/location.module';


import { CouponModule } from './coupons/coupon.module';
import { ProfileModule } from './profile/profile.module';
import { OrderConfirmModule } from './coupons/order-confirm/order-confirm.module';
import { TermConditionModule } from './coupons/terms-conditions/terms-conditions.module';
import { JoinFriendModule } from './coupons/join-friend/joinFriend.module';
import { PreviousCouponModule } from './previous-coupons/previousCoupon.module';

import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyAGMdOZPvWC-k__DNkAk9aGkPZ8x7OIGeY",
          libraries: ["places"]
        }),
    	DHomeModule,
        UserModule,
        LocationModule,
        OrderConfirmModule,
        TermConditionModule,
        JoinFriendModule,
        CouponModule,
        ProfileModule,
        PreviousCouponModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
