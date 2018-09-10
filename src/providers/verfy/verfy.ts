import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class VerifyProvider {

  constructor(public http: Http) {
    console.log('Hello VerifyProvider Provider');
  }
  url: string = 'http://54.163.41.235:1337/api/verify';

  verify(code) {
    console.log(localStorage.getItem('token'));

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let options = new RequestOptions({ headers: headers });


    let body: any = { "verification_code": code };
    body = JSON.stringify(body);
    console.log(body);
    return this.http.post(this.url, body, options).map((response: Response) => response.json());

  }
}
