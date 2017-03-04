import { Route } from '@angular/router';

import { ProviderHomeRoutes } from './home/index';

import { ProviderDashboardComponent } from './index';

export const ProviderDashboardRoutes: Route[] = [
  	{
    	path: 'provider-dashboard',
    	component: ProviderDashboardComponent,
    
  	}
];
