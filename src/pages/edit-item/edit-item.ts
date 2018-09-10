import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';

import { ProfilePage } from '../profile/profile';

import { ProfileProvider } from '../../providers/profile/profile';
import { AdditemProvider } from '../../providers/add-item/add-item';
import { CategoryProvider } from '../../providers/category/category';

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  isGive = false;
  isExchange = false;
  isTake = false;
  isForGood = true;
  itemDescription = null;
  itemName = null;
  duration = null;
  img1 = null;
  img2 = null;
  img3 = null;
  adress = null;
  itemType: any;
  oldData: any;
  imgbasurl: any = "http://54.163.41.235:1337";
  itemID: any;
  categories = [];
  Addresses = [];
  images = [];
  category = null;
  constructor(private navParams: NavParams, private viewCtrl: ViewController, private imagePicker: ImagePicker, private zone: NgZone, public profileProvider: ProfileProvider, public navCtrl: NavController, public addItemProvider: AdditemProvider, public categoryProvider: CategoryProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');

    this.categoryProvider.getcategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories);
    });

    this.profileProvider.details().subscribe(response => {
      this.Addresses = response.user.Address
    });

    this.oldData = this.navParams.get("itemData");
    if (this.oldData.itemTransaction == "G") {
      this.isGive = true;
    } else if (this.oldData.itemTransaction == "E") {
      this.isExchange = true;
    } else if (this.oldData.itemTransaction == "T") {
      this.isTake = true;
    }

    this.itemName = this.oldData.itemname;
    this.itemDescription = this.oldData.itemdes;
    this.duration = this.oldData.itemduration;
    if (this.duration == "for good") {
      this.isForGood = true;
    } else {
      this.isForGood = false;
      this.duration = this.oldData.itemduration;
    }
    this.img1 = this.oldData.itemimg[0];
    this.img2 = this.oldData.itemimg[1];
    this.img3 = this.oldData.itemimg[2];
    this.itemID = this.oldData.itemid;
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
        if (imageNumber == 1) {
          this.img1 = "data:image/jpeg;base64," + result[0].toString();
        } else if (imageNumber = 2) {
          this.img2 = "data:image/jpeg;base64," + result[0].toString();
        } else if (imageNumber = 3) {
          this.img3 = "data:image/jpeg;base64," + result[0].toString();
        }
      },
      (err) => { console.log(err); });
  }

  updateDuraton(event) {
    this.zone.run(() => {
    });
  }
  close() {
    this.viewCtrl.dismiss();
  }

  edit() {
    this.images[0] = this.img1;
    this.images[1] = this.img2;
    this.images[2] = this.img3;
    var categoryId;
    for (var i = 0; this.categories.length > i; i += 1) {
      if (this.categories[i].name === this.category) {
        categoryId = this.categories[i].id;
        console.log(categoryId)
      }
    }
    if (this.isForGood) {
      this.duration = "for good";
    }
    var itemData = {
      "itemid": this.itemID,
      "name": this.itemName,
      "categoryID": categoryId,
      "transactionType": this.itemType,
      "duration": this.duration,
      "description": this.itemDescription,
      "privacy": " ",
      "location": parseInt(this.adress),
      "images": this.images,

    }
    console.log("item edit data : ", itemData);
    this.addItemProvider.editItem(itemData).then(() => {
      this.viewCtrl.dismiss();
    }).catch(err => {
      console.log("edit item error :", err);
    });
  }

}
