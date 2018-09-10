import { Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';

import {UserHomePage} from '../user-home/user-home';
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  goToHome(){
    this.navCtrl.setRoot(UserHomePage);
  }

}
