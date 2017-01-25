import { Route } from '@angular/router';

import { HomeRoutes } from './home/index';

import { UserRoutes } from './users/index';
import { BlankPageRoutes } from './blank-page/index';
import { FormRoutes } from './forms/index';

import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
	    	
            ...UserRoutes,
	    	
        ...FormRoutes,
    	]
  	}
];
