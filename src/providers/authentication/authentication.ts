import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class AuthenticationProvider {

  loginurl: string = 'http://54.163.41.235:1337/api/login';
  regurl: string = 'http://54.163.41.235:1337/api/register'

  constructor(private http: Http) {

  }
  register(credentials) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body: any = { "fullName": credentials.fullname, "email": credentials.email, "password": credentials.password, "mobileNumber": credentials.mobile };
    body = JSON.stringify(body);
    console.log("datapassed to service")
    console.log(body);
    return this.http.post(this.regurl, body, { headers: headers }).map((res) => { return res.json() });
  }

  login(credentials) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body: any = { "email": credentials.email, "password": credentials.password };
    return this.http.post(this.loginurl, body, { headers: headers }).map((res) => { return res.json() });
  }

}
