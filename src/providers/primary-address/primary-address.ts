import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';


@Injectable()
export class PrimaryAddressProvider {

  addaddress: string = 'http://54.163.41.235:1337/api/addAddress';
  editaddress: string = 'http://54.163.41.235:1337/api/editAddress'
  constructor(public http: Http) {
    console.log('Hello PrimaryaddressProvider Provider');
  }
  
  addprimaryaddress(address) {
    console.log(address)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "country": address.country, "city": address.city, "area": address.area, "mobile": address.mobile, "Primary": true, "location": address.location };
    body = JSON.stringify(body);
    // console.log(body);
    return this.http.post(this.addaddress, body, { headers: headers }).map((res) => { return res.json() });
  }
  editprimaryaddress(id, address) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

    let body: any = { "address_id": id, "country": address.country, "city": address.city, "area": address.area, "mobile": address.mobile, "Primary": true, "location": "" };
    body = JSON.stringify(body);
    // console.log(body);
    return this.http.post(this.editaddress, body, { headers: headers }).map((res) => { return res.json() });
  }
  editadditionaladdress(id, address) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

    let body: any = { "address_id": id, "country": address.country, "city": address.city, "area": address.area, "mobile": address.mobile, "Primary": false, "location": address.location };
    body = JSON.stringify(body);
    console.log("datapassed to service")
    console.log(body);
    return this.http.post(this.editaddress, body, { headers: headers }).map((res) => { return res.json() });
  }

}
