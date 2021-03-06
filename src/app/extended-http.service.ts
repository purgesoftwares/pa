import { Injectable, Injector } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ExtendedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions,
  private injector: Injector, private userService: UserService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    //do whatever 
    /*if (typeof url === 'string') {
      if (!options) {
        options = { headers: new Headers() };
      }
      this.setHeaders(options);
    } else {
      this.setHeaders(url);
    }*/

    console.log("asdadssadasdsd");
    return super.request(url, options).catch(this.catchErrors());
  }

  private catchErrors() {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        //handle authorization errors
        //in this example I am navigating to logout route which brings the login screen
        this.router.navigate(['logout']);
      }
      return Observable.throw(res);
    };
  }

  public get router(): Router { //this creates router property on your service.
     return this.injector.get(Router);
  }

  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    //add whatever header that you need to every request
    //in this example I add header token by using authService that I've created
    objectToSetHeadersTo.headers.set('Token', this.userService.getToken());
  }
}