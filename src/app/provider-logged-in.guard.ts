import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Injectable()
export class ProviderLoggedInGuard implements CanActivate {
  
  private toasterService: ToasterService;

  constructor(private router: Router, private user: UserService, 
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  canActivate() {
    if(this.user.isProviderLoggedIn()){
      return true;
    }else{
      localStorage.removeItem('access_token');
      localStorage.removeItem('isProvider');
      this.toasterService.pop('error', 'Invalid Access',
               'There is no active Session to Access, Please Login to Access!');
                  this.router.navigate(['/provider-login']);
      return false;

    }
  }
}