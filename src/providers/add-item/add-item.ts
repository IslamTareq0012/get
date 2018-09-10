import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';


@Injectable()
export class AdditemProvider {
  url: string = "http://54.163.41.235:1337/api/addItem"
  constructor(public http: Http) {

  }
  additem(name, catid, type, duration, location, privacy, des, images) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "name": name, "categoryID": catid, "transactionType": type, "duration": duration, "location": location, "privacy": privacy, "description": des, "images": images };
    body = JSON.stringify(body);
    console.log("datapassed to service")
    console.log(catid)
    console.log(body);
    return this.http.post(this.url, body, { headers: headers }).map((res) => { return res.json() });
  }
  editItem(body){
    var editURL = "http://54.163.41.235:1337/api/updateItem";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    return this.http.post(editURL, JSON.stringify(body), { headers: headers }).map((res) => { return res.json() }).toPromise();
  }
}
