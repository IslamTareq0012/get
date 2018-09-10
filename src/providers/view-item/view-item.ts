import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class ViewItemProvider {

  url: string = "http://54.163.41.235:1337/api/viewItem"
  constructor(public http: Http) {
    console.log('Hello ViewitemProvider Provider');
  }

  viewitem(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "itemId": id };
    body = JSON.stringify(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });

  }
  deleteItem(id) {
    var deleteURL ="http://54.163.41.235:1337/api/deleteItem"
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "itemId": id };
    body = JSON.stringify(body);
    return this.http.post(deleteURL, body, { headers: headers }).map((res) => { return res.json() }).toPromise();

  }

}
