import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController , Events   } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';


import { ProfileProvider } from '../../providers/profile/profile';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user: any = { fullName: '', email: '', mobileNumber: '', image: '', Address: [] }
  imgURL;
  imgbasurl: any = "http://54.163.41.235:1337";
  ran: any;  
  imagePicked;
  constructor(private events: Events,public viewCtrl: ViewController, public profileProvider: ProfileProvider, private alertCtrl: AlertController, private imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad EditProfilePage');
    this.user = this.navParams.get('userDetails');
    this.imgURL = this.user.image;
    this.imagePicked = false;
    this.ran =  Math.random();    
  }

  chooseImage() {
    let options = {
      quality: 95,
      width: 500,
      height: 500,
      maximumImagesCount: 1,
      outputType: 1
    }
    this.imagePicker.getPictures(options)
      .then((result) => {
        this.imgURL = "data:image/jpeg;base64," + result[0].toString();
        this.user.image = this.imgURL;
        this.imagePicked = true;
      },
      (err) => { console.log(err); });
  }
  editProfile() {
    this.profileProvider.editprofile(this.user).subscribe(
      response => {
        if (response.message == "Success") {
          let alert = this.alertCtrl.create({
            title: 'Updated!',
            buttons: ['Ok']
          });
          alert.present();
        }
        this.events.publish('RESPONSE:ERROR', null);        
        this.viewCtrl.dismiss();
      });
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
