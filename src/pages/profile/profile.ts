import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController , Events  } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { ItemDetailsPage } from '../item-details/item-details';
import { AddItemPage } from '../add-item/add-item';
import { EditAdditionAddressPage } from '../edit-addition-address/edit-addition-address';
import { AddAdditionalAddressPage } from '../add-additional-address/add-additional-address';

import { ProfileProvider } from '../../providers/profile/profile';
import { ListitemsProvider } from '../../providers/list-items/list-items';
import { PrimaryAddressProvider } from '../../providers/primary-address/primary-address';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  ran: any;
  public button1: boolean = true;
  public button2: boolean = false;
  public button3: boolean = false;
  imgbasurl: any = "http://54.163.41.235:1337";
  addressid: any;
  user: any = { fullName: '', email: '', mobileNumber: '', image: '', Address: [], id: null , rating : null  };
  Addresses = [];
  temp: any;
  base64image: string;
  items = [];
  additionalAddresses = [];

  constructor(private events: Events,public alertCtrl: AlertController, public listProvider: ListitemsProvider, public primaryAddressProvider: PrimaryAddressProvider, public profileProvider: ProfileProvider, private imagePicker: ImagePicker, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.temp = JSON.parse(localStorage.getItem('address'));
    this.loadProfileData();
    console.log(this.temp);
    this.ran = Math.random();
  }

  Details() {
    this.button1 = true;
    this.button2 = false;
    this.button3 = false;
  }
  Addressbook() {
    this.button1 = false;
    this.button2 = true;
    this.button3 = false;
  }
  Items() {
    this.button1 = false;
    this.button2 = false;
    this.button3 = true;
  }


  alertdelete(id) {
    console.log("address id :", id);
    this.profileProvider.deleteaddress(id).subscribe(
      response => {
        console.log("deleteing address message :", response);
        let alert = this.alertCtrl.create({
          title: 'Removed!',
          buttons: ['Ok']
        });
        alert.present();
        for (var i = 0; i < this.Addresses.length; i++) {
          if (this.Addresses[i].id == id) {
            this.Addresses.splice(i, 1);
          }
        }
      });
  }

  addAdditionalAddress() {
    var modalPage = this.modalCtrl.create(AddAdditionalAddressPage);
    modalPage.present();
    modalPage.onDidDismiss(() => {
      this.ran = Math.random();
      this.loadProfileData();
    });
  }

  editPrimaryAddress(id) {
    var modalPage = this.modalCtrl.create(EditAdditionAddressPage, { 'addressid': id });
    modalPage.present();
    modalPage.onDidDismiss(() => {
      this.ran = Math.random();
      this.loadProfileData();
    });
  }

  editAdditionalAddress(id) {
    var modalPage = this.modalCtrl.create('EditAdditionAddressPage', { 'addressid': id });
    modalPage.present();
    modalPage.onDidDismiss(() => {
      this.ran = Math.random();
      this.loadProfileData();
    });
  }

  editProfile() {
    var modalPage = this.modalCtrl.create('EditProfilePage', { 'userDetails': this.user });
    modalPage.present();
    modalPage.onDidDismiss(() => {
      this.ran = Math.random();
      this.events.publish('RESPONSE:ERROR', null);
      this.loadProfileData();
    });
  }

  showItem(id) {
    let obj = {
      "id": id
    }
    var modalPage = this.modalCtrl.create(ItemDetailsPage,{ itemid: obj, userDetails: this.user });
    modalPage.present();
  }

  navAddimem() {
    var modalPage = this.modalCtrl.create(AddItemPage);
    modalPage.present();
  }
  loadProfileData() {
    this.profileProvider.details().subscribe(
      response => {
        console.log(response);
        this.user.fullName = response.user.fullName;
        this.user.email = response.user.email;
        this.user.mobileNumber = response.user.mobileNumber;
        this.user.Address = response.user.Address;
        this.user.image = response.user.image;
        this.user.id = response.user.id;
        this.Addresses = this.user.Address;
        this.items = response.user.Items;
        this.user.rating = response.user.rating;        
        console.log("item: ", response.user.Items)
        console.log(" the user data :", this.user);
        console.log("user id", this.user.id);
      });
  }

}
