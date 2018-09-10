import { Component, NgZone } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { ProfilePage } from '../profile/profile';

import { ProfileProvider } from '../../providers/profile/profile';
import { AdditemProvider } from '../../providers/add-item/add-item';
import { CategoryProvider } from '../../providers/category/category';
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  isGive = true;
  isExchange = false;
  isTake = false;
  isForGood = true;
  itemDescription = null;
  itemName = null;
  category = null;
  adress = null;
  duration = null;
  img1 = null;
  img2 = null;
  img3 = null;
  images = [];
  categories = [];
  Addresses = [];
  savedItemData: any;
  itemType ="G";
  modalOptions: any;
  constructor(private viewCtrl: ViewController, private imagePicker: ImagePicker, private zone: NgZone, public profileProvider: ProfileProvider, public navCtrl: NavController, public addItemProvider: AdditemProvider, public categoryProvider: CategoryProvider) {
  }

  ionViewDidLoad() {
    this.categoryProvider.getcategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories);
    });
    this.profileProvider.details().subscribe(
      response => {
        this.Addresses = response.user.Address
      });
    console.log('ionViewDidLoad AddItemPage');
  }
  giveClicked() {
    this.isGive = true;
    this.isExchange = false;
    this.isTake = false;
    this.itemType = "G";
  }
  exchangeClicked() {
    this.isGive = false;
    this.isExchange = true;
    this.isTake = false;
    this.itemType = "E";

  }

  takeClicked() {
    this.isGive = false;
    this.isExchange = false;
    this.isTake = true;
    this.itemType = "T";

  }

  forGoodToggle() {
    if (this.isForGood) {
      this.isForGood = false;
    } else {
      this.isForGood = true;
    }
  }

  updateDuraton(event) {
    this.zone.run(() => {
    });
  }
  close() {
    this.viewCtrl.dismiss();
  }
  chooseImage(imageNumber) {
    let options = {
      quality: 95,
      width: 500,
      height: 500,
      maximumImagesCount: 1,
      outputType: 1
    }
    this.imagePicker.getPictures(options)
      .then((result) => {
        if (imageNumber==1) {
          this.img1 = "data:image/jpeg;base64," + result[0].toString();
        } else if (imageNumber=2) {
          this.img2 = "data:image/jpeg;base64," + result[0].toString();
        } else if (imageNumber=3) {
          this.img3 = "data:image/jpeg;base64," + result[0].toString();
        }
      },
      (err) => { console.log(err); });
  }

  additem() {
    console.log("share clicked ");
    var categoryId;
    for (var i = 0; this.categories.length > i; i += 1) {
      if (this.categories[i].name === this.category) {
        categoryId = this.categories[i].id;
        console.log(categoryId)
      }
    }
    console.log(this.adress)
    if(this.img1 && this.img2 && this.img3){
    this.images[0] = this.img1;
    this.images[1] = this.img2;
    this.images[2] = this.img3;
    }

    if (this.isForGood) {
      this.duration = "for good";
    }
    this.addItemProvider.additem(this.itemName, categoryId, this.itemType, this.duration, this.adress, " ", this.itemDescription, this.images).subscribe(
      response => {
        this.savedItemData = response;
        console.log(this.savedItemData);
        this.navCtrl.setRoot(ProfilePage);
      },err =>{
        console.log("images error " , JSON.parse(err['_body']).validationErrors);
      });
  }

}
