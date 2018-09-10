import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';

import { VerifyProvider } from '../../providers/verfy/verfy';
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public Verify: VerifyProvider, public alertCtrl: AlertController) {
  }

  digits: any[] = [];
  code: string = '';
  data: any = null;
  click1: boolean = false;
  click2: boolean;
  click3: boolean;
  click4: boolean;
  radios: any = [];

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }
  buttonclick(number) {
    this.digits.push(number);


    if (this.digits.length == 4) {
      for (var i = 0; i < this.digits.length; i += 1) {
        this.code += this.digits[i].toString();
      }
      console.log(this.code);
      this.verify();
    }

    console.log(this.digits);
  }

  buttondelete() {
    this.digits.pop();
    console.log(this.digits);

  }
  verify() {
    this.Verify.verify(this.code).subscribe(
      data => {
        if (data.message == 'user verified') {
          console.log(data.message)
          let alert = this.alertCtrl.create({
            title: 'Verified Successfully',
            buttons: ['Ok']
          });
          alert.present();
          localStorage.clear();
          localStorage.setItem('token', data.account_Number)
          this.navCtrl.setRoot(CategoriesPage);
        }
      });
  }


}
