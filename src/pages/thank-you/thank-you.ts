import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { IntroPage } from "../intro/intro"


@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankyouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankyouPage');
  }

  goToHome() {
    this.navCtrl.setRoot(IntroPage);
  }
}
