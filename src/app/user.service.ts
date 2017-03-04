import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserService {
  private loggedIn = false;
  private isProvider = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('access_token');
    this.isProvider = !!localStorage.getItem('isProvider');
  }

  login(email, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        '/login', 
        JSON.stringify({ email, password }), 
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('access_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }
  
  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn = false;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return this.loggedIn;
  }
  isProviderLoggedIn() {
    return (this.loggedIn && this.isProvider);
  }
}