import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';

import { UserModule } from './users/user.module';


import { CouponModule } from './coupons/coupon.module';
import { ProfileModule } from './profile/profile.module';
import { OrderConfirmModule } from './coupons/order-confirm/order-confirm.module';

import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	HomeModule,
        UserModule,
        OrderConfirmModule,
        CouponModule,
        ProfileModule,
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
