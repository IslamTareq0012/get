import { Component } from '@angular/core';
import { NavController, AlertController, Events  } from 'ionic-angular';

import { VerificationPage } from '../verification/verification';
import {UserHomePage} from '../user-home/user-home';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ForgetPasswordProvider } from '../../providers/forget-password/forget-password';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: string = '';
  logincredentials = { email: '', password: '' };
  regcredentials = { fullname: '', email: '', password: '', mobile: '' };
  public buttonClicked1: boolean = true;
  public buttonClicked2: boolean = false;
  public buttonClicked3: boolean = false;

  constructor(private events: Events,private forgetPassword: ForgetPasswordProvider, public navCtrl: NavController, private alertCtrl: AlertController, private auth: AuthenticationProvider) {
  }

  buttonclicked3() {
    this.buttonClicked1 = false;
    this.buttonClicked2 = false;
    this.buttonClicked3 = true;
  }
  register() {
    this.auth.register(this.regcredentials).subscribe(
      data => {
        console.log(data)
        if (data.message != "this mobile Number is already Registered") {
          let alert = this.alertCtrl.create({
            title: 'Your Verification Code',
            subTitle: data.verification_code,
            buttons: ['Ok']
          });
          alert.present();
          console.log(data.token);
          localStorage.setItem('token', data.token);
          this.navCtrl.setRoot(VerificationPage);
        }


        else {
          let alert = this.alertCtrl.create({
            title: 'Register Failed',
            subTitle: 'User already exists!',
            buttons: ['Ok']
          });
          alert.present();
        }
      },
      error => {
        let alert = this.alertCtrl.create({
          title: 'Register Failed',
          subTitle: 'Wrong Credentials',
          buttons: ['Ok']
        });
        alert.present();
      });

  }
  login() {
    this.auth.login(this.logincredentials).subscribe(
      data => {
        if (data.message != "invalid email or password") {
          localStorage.setItem('logintoken', data.account_Number)
          localStorage.setItem('token', data.account_Number)
          this.events.publish('RESPONSE:ERROR', null);
          
          this.navCtrl.setRoot(UserHomePage);
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Login Failed',
            subTitle: 'Wrong Credentials',
            buttons: ['Ok']
          });
          alert.present();
        }
      },
      error => {
        let alert = this.alertCtrl.create({
          title: 'Login Failed',
          subTitle: 'Wrong Credentials',
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  onButtonClick1() {

    this.buttonClicked1 = true;
    this.buttonClicked2 = false;
    this.buttonClicked3 = false;

  }
  onButtonClick2() {

    this.buttonClicked1 = false;
    this.buttonClicked2 = true;
    this.buttonClicked3 = false;
  }

  forgetpass() {
    this.forgetPassword.forgetpass(this.email).subscribe(
      message => {
        if (message.message == "email sent") {
          let alert = this.alertCtrl.create({
            title: 'Done!',
            subTitle: 'An email has beent sent',
            buttons: ['Ok']
          });
          alert.present();
        }
        else if (message.exists == false) {
          let alert = this.alertCtrl.create({
            title: 'Done!',
            subTitle: 'An email has beent sent',
            buttons: ['Ok']
          });
          alert.present();
        }
      });
  }


}
