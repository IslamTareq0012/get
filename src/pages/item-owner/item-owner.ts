import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ItemDetailsPage } from '../../pages/item-details/item-details';
import { ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-item-owner',
  templateUrl: 'item-owner.html',
})
export class ItemOwnerPage {

  itemAndOwnerData: any;
  imgbasurl: any = "http://54.163.41.235:1337";
  numberOfItems: any;
  items: any;
  ownerName: any;
  itemOwnerArea: any;
  ownerImage: any;
  ownerRating: any;
  ownerID: any;
  user: any = { fullName: '', email: '', mobileNumber: '', image: '', Address: [], id: null , rating : null };

  constructor( private profileProvider: ProfileProvider,private modalCtrl: ModalController, private viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.profileProvider.details().subscribe(
      response => {
        console.log(response.user);
        this.user.fullName = response.user.fullName;
        this.user.email = response.user.email;
        this.user.id = response.user.id;
        this.user.mobileNumber = response.user.mobileNumber;
        this.user.Address = response.user.Address;
        this.user.image = response.user.image;
        this.user.rating = response.user.rating;
      });

    console.log('ionViewDidLoad ItemOwnerPage');
    this.itemAndOwnerData = this.navParams.get("itemsAndOwnserData");
    console.log("owner and items ", this.itemAndOwnerData);
    this.items = this.itemAndOwnerData.allItmes;
    this.numberOfItems = this.items.length;
    this.ownerImage = this.itemAndOwnerData.ownerImage;
    this.ownerName = this.itemAndOwnerData.ownerName;
    this.ownerRating = this.itemAndOwnerData.ownerRating;
    this.itemOwnerArea = this.itemAndOwnerData.itemOwnerArea;
    this.ownerID = this.itemAndOwnerData.ownerID;
  }

  showItem(id) {
    let obj = {
      "id": id
    }
    var modalPage = this.modalCtrl.create(ItemDetailsPage, { itemid: obj, userDetails: this.user });
    modalPage.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
