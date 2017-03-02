import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProfileService {
  constructor(private http: Http) {}

  getProfile() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('access_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('http://54.161.216.233:8090/api/secured/user/current-customer', { headers })
      .map(res => res.json());
  }
}