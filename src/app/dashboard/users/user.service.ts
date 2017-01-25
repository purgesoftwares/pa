import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: Http) { }
  
  getData(){
        return this.http.get('app/dashboard/users/user.json')
            .map(res => res.json());
  }
}