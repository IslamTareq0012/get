import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class ForgetPasswordProvider {
 url: string='http://54.163.41.235:1337/api/forgetPassword'
  constructor(public http: Http) {
    
  }
  forgetpass(email){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', email);
    let body = urlSearchParams.toString()
    console.log(body);
    return this.http.post(this.url , body,options).map((response: Response) => response.json());
  }

}
