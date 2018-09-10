
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

@Injectable()
export class ProfileProvider {
  url: string = 'http://54.163.41.235:1337/api/viewProfile'
  addaddress: string = 'http://54.163.41.235:1337/api/addAddress'
  editprofileurl: string = 'http://54.163.41.235:1337/api/editProfile'
  removeaddress: string = 'http://54.163.41.235:1337/api/deleteAddress'
  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }
  details() {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

    return this.http.get(this.url, { headers: headers }).map((res) => { return res.json() });
  }
  addadditionaladdress(address) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "country": address.country, "city": address.city, "area": address.area, "mobile": address.mobile, "Primary": false, "location": address.location };
    body = JSON.stringify(body);
    // console.log(body);
    return this.http.post(this.addaddress, body, { headers: headers }).map((res) => { return res.json() });
  }

  editprofile(data) {
    console.log("inside funciton")
    console.log(data)
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "fullName": data.fullName, "email": data.email, "mobileNumber": data.mobileNumber, "image": data.image };
    body = JSON.stringify(body);
    console.log("///////////////////////////////////")
    console.log(body);
    return this.http.post(this.editprofileurl, body, { headers: headers }).map((res) => { return res.json() });

  }
  editimage(data) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "fullName": data.fullName, "email": data.email, "mobileNumber": data.mobileNumber, "image": data.image };
    body = JSON.stringify(body);

    return this.http.post(this.editprofileurl, body, { headers: headers }).map((res) => { return res.json() });
  }
  deleteaddress(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = { "address_id": id };
    body = JSON.stringify(body);
    // console.log(body);
    return this.http.post(this.removeaddress, body, { headers: headers }).map((res) => { return res.json() });
  }
}
