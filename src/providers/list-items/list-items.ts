import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';


@Injectable()
export class ListitemsProvider {
  url: any = 'http://54.163.41.235:1337/api/homePage';
  constructor(public http: Http) {
    console.log('Hello ListitemsProvider Provider');
  }

  listitems() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

    console.log("token ", localStorage.getItem('token') );
    let body: any = {}
    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => {
      return res.json();
    }).toPromise();
  }
  listgiveitems() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));


    let body: any = { "transactionType": "G" }
    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }
  listnewestitems() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));


    let body: any = {}

    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }
  listnearest(city) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));


    let body: any = { "city": city }

    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }
  listtakeitems() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));


    let body: any = { "transactionType": "T" }

    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }

  listexitems() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));


    let body: any = { "transactionType": "E" }

    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }
  listpub() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));


    let body: any = { "privacy": "public" }

    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }
  listprivate() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));


    let body: any = { "privacy": "private" }

    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }
}

