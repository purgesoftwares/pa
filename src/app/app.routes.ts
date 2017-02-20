import { Routes } from '@angular/router';

import { LoginRoutes } from './login/index';
import { SignupRoutes } from './signup/index';
import { PageRoutes } from './page/index';
import { DashboardRoutes } from './dashboard/index';

import { PageComponent } from './page/index';
import { LoginComponent } from './login/index';
import { ForgotPasswordComponent } from './forgot-password/index';
import { ResetPasswordComponent } from './reset-password/index';
import { SignupComponent } from './signup/index';
import { DashboardComponent } from './dashboard/index';
import { CouponComponent } from './dashboard/coupons/index';
import { ProfileComponent } from './dashboard/profile/index';
import { HelpComponent } from './page/help/index';
import { HomeComponent } from './page/home/index';
import { DHomeComponent } from './dashboard/home/index';
import { AboutComponent } from './page/about/index';
import { PrivacyComponent } from './page/privacy/index';
import { LocationComponent } from './dashboard/location/index';
import { CouponViewComponent } from './dashboard/coupons/coupon-view/index';
import { OrderConfirmComponent } from './dashboard/coupons/order-confirm/index';
import { TermConditionComponent } from './dashboard/coupons/terms-conditions/index';
import { JoinFriendComponent } from './dashboard/coupons/join-friend/index';
import { PreviousCouponComponent } from './dashboard/previous-coupons/index';

export const routes: Routes = [
	
	{
    	path: 'signup',	
    	component: SignupComponent
  	},
    {
      path: 'login',  
      component: LoginComponent
    },
    {
      path: 'forgot-password',  
      component: ForgotPasswordComponent
    },
  	{
    	path: 'reset-password',	
    	component: ResetPasswordComponent
  	},
	{
    	path: '',	
    	component: PageComponent,
      children: [
            {
                path: '', 
                component: HomeComponent,
                   
            },
            {
                path: 'help', 
                component: HelpComponent,
                   
            },
            {
                path: 'about', 
                component: AboutComponent,
                   
            },
            {
                path: 'privacy', 
                component: PrivacyComponent,
                   
            }
      ]
  	},
    {
      path: 'dashboard', 
      component: DashboardComponent,
      children: [
        {
            path: '', 
            component: DHomeComponent,
               
        },
      	{
      			path: 'profile', 
      			component: ProfileComponent,
               
    		},
        {
            path: 'location', 
            component: LocationComponent,
               
        },
	    	{
      			path: 'coupon', 
      			component: CouponComponent,
               
    		},
        {
            path: 'order-confirm', 
            component: OrderConfirmComponent,
               
        },
        {
            path: 'coupon-view', 
            component: CouponViewComponent,
        },
        {
            path: 'terms-conditions', 
            component: TermConditionComponent,
        },
        {
            path: 'join-friend', 
            component: JoinFriendComponent,
        },
        {
            path: 'previous-coupons', 
            component: PreviousCouponComponent,
        }
    	]
    }
];
