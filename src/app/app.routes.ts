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
    	component: PageComponent
  	},
    {
      path: 'dashboard', 
      component: DashboardComponent,
      children: [
	    	{
      			path: 'coupon', 
      			component: CouponComponent
    		}
    	]
    }
];
