import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';

import { UserRoutes } from './users/index';
import { BlankPageRoutes } from './blank-page/index';
import { CouponRoutes } from './coupons/index';

import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
	    	...CouponRoutes,
        ...UserRoutes
    	]
  	}
];
