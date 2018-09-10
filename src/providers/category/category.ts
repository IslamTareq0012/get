import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class CategoryProvider {
 
  url: string = 'http://54.163.41.235:1337/api/listCategories'
  addurl: string = 'http://54.163.41.235:1337/api/addCategories'
  constructor(public http: Http) {
    console.log('Hello CategoriesProvider Provider');
  }

  getcategories() {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

    return this.http.get(this.url, { headers: headers }).map((res) => { return res.json() });
  }

  addCategories(selected) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(localStorage.getItem('accountnumber'))
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let urlSearchParams = new URLSearchParams();
    let body: any = { "categoriesIds": selected };
    body = JSON.stringify(body);
    return this.http.post(this.addurl, body, { headers: headers }).map((res) => { return res.json() });
  }
}
