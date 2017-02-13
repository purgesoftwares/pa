import { Routes } from '@angular/router';

import { LoginRoutes } from './login/index';
import { SignupRoutes } from './signup/index';
import { PageRoutes } from './page/index';
import { DashboardRoutes } from './dashboard/index';

import { PageComponent } from './page/index';
import { LoginComponent } from './login/index';
import { SignupComponent } from './signup/index';
import { DashboardComponent } from './dashboard/index';
import { CouponComponent } from './dashboard/coupons/index';
import { ProfileComponent } from './dashboard/profile/index';
import { HelpComponent } from './page/help/index';
import { HomeComponent } from './page/home/index';
import { AboutComponent } from './page/about/index';
import { PrivacyComponent } from './page/privacy/index';
import { OrderConfirmComponent } from './dashboard/coupons/order-confirm/index';
import { CouponViewComponent } from './dashboard/coupons/coupon-view/index';

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
      			path: 'profile', 
      			component: ProfileComponent,
               
    		},
	    	{
      			path: 'coupon', 
      			component: CouponComponent,
               
    		},
        {
            path: 'coupon-view', 
            component: CouponViewComponent,
        },
        {
            path: 'order-confirm', 
            component: OrderConfirmComponent,
        }
    	]
    }
];
