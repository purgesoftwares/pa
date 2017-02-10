import { Routes } from '@angular/router';

import { LoginRoutes } from './login/index';
import { SignupRoutes } from './signup/index';
import { PageRoutes } from './page/index';
import { DashboardRoutes } from './dashboard/index';

import { PageComponent } from './page/index';

export const routes: Routes = [
	
	{
    	path: '',	
    	component: PageComponent
  	}
];
