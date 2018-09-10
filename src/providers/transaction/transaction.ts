import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
/*
  Generated class for the TransactionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TransactionProvider {
  constructor(public http: Http) {
  }

  addTransaction(transactionData) {
    var url: string = "http://54.163.41.235:1337/api/createRequest";

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

    return this.http.post(url, transactionData, { headers: headers }).map((res) => { return res.json() }).toPromise();
  }

  viewTransactions() {
    var url: string = "http://54.163.41.235:1337/api/viewRequests";

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let body: any = {};
    body = JSON.stringify(body);
    console.log("datapassed to service")
    console.log(body);
    return this.http.post(url, body, { headers: headers }).map((res) => { return res.json() }).toPromise();
  }

  viewActiveTransactions(){
    var url: string = "http://54.163.41.235:1337/api/viewActiveOrder";
    
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
        let body: any = {};
        body = JSON.stringify(body);
        console.log("datapassed to service")
        console.log(body);
        return this.http.post(url, body, { headers: headers }).map((res) => { return res.json() }).toPromise();
    
  }

  editTransactionStatus(transactionData) {
    var url: string = "http://54.163.41.235:1337/api/updateRequestStatus";
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

    return this.http.post(url, transactionData, { headers: headers }).map((res) => { return res.json() }).toPromise();

  }

}
