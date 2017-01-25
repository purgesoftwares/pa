import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {AppComponent} from './app.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { routes } from './app.routes';

import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    	BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		LoginModule,
		SignupModule,
		DashboardModule,
		SharedModule.forRoot()
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
