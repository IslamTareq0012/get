import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


import { PrimaryAddressPage } from '../primary-address/primary-address';

import { CategoryProvider } from '../../providers/category/category';
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  categ: any[] = null;
  sports: any;
  selectedcateg: any[] = [];
  click1: boolean = false;
  click2: boolean = false;
  click3: boolean = false;
  click4: boolean = false;
  click5: boolean = false;
  click6: boolean = false;
  click7: boolean = false;
  click8: boolean = false;
  click9: boolean = false;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public category: CategoryProvider) {
  }

  ionViewDidLoad() {
    this.category.getcategories().subscribe(res => {
      this.category = res;
      console.log(this.category);
    });
  }

  addtoselected(id, click) {
    if (click == true)
      this.selectedcateg.push(id);

    else if (click == false) {

      this.selectedcateg.splice(this.selectedcateg.indexOf(id), 1);
    }
  }
  addtouser() {
    console.log(this.selectedcateg);

    var url: string = 'http://54.163.41.235:1337/api/listCategories'
    var addurl: string = 'http://54.163.41.235:1337/api/addCategories'

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(localStorage.getItem('accountnumber'))
    headers.append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
    let urlSearchParams = new URLSearchParams();
    let body: any = { "categoriesIds": this.selectedcateg };
    body = JSON.stringify(body);
    this.http.post(addurl, body, { headers: headers }).map((res) => { return res.json() }).subscribe(res => {
      console.log(res)
      if (res.message == "categories added successfully") {
        this.navCtrl.setRoot(PrimaryAddressPage);
      }
    });
  }

}




    // this.category.addCategories(this.selectedcateg).subscribe(
    //   res => {
    //     console.log(res)
    //     if (res.message == "categories added successfully") {
    //       this.navCtrl.setRoot(PrimaryAddressPage);
    //     }
    //   });