import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';

@Component({
  selector: 'page-invite-friends',
  templateUrl: 'invite-friends.html',
})
export class InviteFriendsPage {
  mail: any;
  constructor(private toastCtrl: ToastController, private socialSharing: SocialSharing, private emailComposer: EmailComposer, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteFriendsPage');
  }

  sendMail() {
    // this.emailComposer.isAvailable().then((available: boolean) => {
    // if (available) {
    let email = {
      to: this.mail,
      subject: 'GET invitation',
      body: '',
    };
    this.emailComposer.open(email);
    // }
    // else {
    //   this.presentFailedToast();
    // }
    // }).catch(err=>{
    //   console.log("send mail error " , err);
    // });
  }

  share() {
    this.socialSharing.share("TEXT TO SHARE", null, null, null)
      .then(() => {
        this.presentSuccessToast();
      },
      () => {
        this.presentFailedToast();
      }).catch(err => {
        console.log("send mail error ", err);
      });
  }

  shareTwitter() {
    this.socialSharing.shareViaTwitter("TEXT TO SHARE", null, null).then(() => {
      this.presentSuccessToast();
    },
      () => {
        this.presentFailedToast();
      }).catch(err => {
        console.log("send mail error ", err);
      });
  }

  shareFacebook() {
    this.socialSharing.shareViaFacebook("TEXT TO SHARE", null, null).then(() => {
      this.presentSuccessToast();
    },
      () => {
        this.presentFailedToast();
      }).catch(err => {
        console.log("send mail error ", err);
      });
  }

  shareMail() {
    this.socialSharing.shareViaEmail("TEXT TO SHARE", "GET app invetation", null).then(() => {
      this.presentSuccessToast();
    },
      () => {
        this.presentFailedToast();
      }).catch(err => {
        console.log("send mail error ", err);
      });
  }

  presentSuccessToast() {
    let toast = this.toastCtrl.create({
      message: 'Shared successfully',
      duration: 3000,
      position: 'buttom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentFailedToast() {
    let toast = this.toastCtrl.create({
      message: 'Failed To share',
      duration: 3000,
      position: 'buttom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}
