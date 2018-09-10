import { Component } from '@angular/core';
import { ModalController,  NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';


import {ProfilePage} from '../../pages/profile/profile';
import {EditItemPage} from '../../pages/edit-item/edit-item';

import { CategoryProvider } from '../../providers/category/category';
import { ProfileProvider } from '../../providers/profile/profile';
import { ViewItemProvider } from '../../providers/view-item/view-item';
import { TransactionProvider } from '../../providers/transaction/transaction';
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {
  ran: any = Math.random();
  itemimg = [];
  itemloc: any;
  itemduration: any;
  itemcat: any;
  itemdes: any;
  itemprovider: any;
  itemname: any;
  imgbasurl: any = "http://54.163.41.235:1337"
  categ = [];
  catid: any;
  user: any;
  Addresses = []
  items = [];
  itemid;
  name: any;
  item: any;
  idOfItemOwner:any;
  UserID:any;
  itemTransaction: any;
  userRating
  constructor( public modalCtrl: ModalController, private alertCtrl: AlertController, private toastCtrl: ToastController, private trancactionProvider: TransactionProvider, private viewCtrl: ViewController, public categoryProvider: CategoryProvider, public viewitemProvder: ViewItemProvider, public profileProvider: ProfileProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user = this.navParams.get("userDetails");
    console.log("user data :", this.user);
    this.UserID = this.user.id;
    this.userRating = this.user.rating;
    this.categoryProvider.getcategories().subscribe(res => {
      this.categ = res;
      console.log(this.categ);
    });
    this.itemid = this.navParams.get('itemid');
    this.itemid = this.itemid.id;
    console.log(this.itemid)
    this.viewitemProvder.viewitem(this.itemid).subscribe(
      response => {
        console.log("view item response ",response);
        this.itemname = response.item.name;
        this.itemprovider = response.Provider.fullName;
        this.itemdes = response.item.description;
        this.itemcat = response.item.categoryID;
        this.itemduration = response.item.duration;
        this.itemloc = response.item.location.city;
        this.itemimg = response.item.images;
        this.idOfItemOwner = response.item.accountID;

        this.itemTransaction = response.item.transactionType;
        console.log("item transaction type" ,this.itemTransaction );
        for (var i = 0; this.categ.length > i; i += 1) {
          if (this.categ[i].id === this.itemcat) {
            this.name = this.categ[i].name;
            console.log(this.name)
          }
        }
      });
    this.profileProvider.details().subscribe(
      response => {
        console.log(response);
        this.items = response.user.Items;
        console.log("item: ", response.user.Items)
      });
  }
  close() {
    this.viewCtrl.dismiss();
  }
  createRequest() {

    var transactionDetails = {
      "ProviderItemId":null,
      "RequesterItemId" : null
    }
    if (this.itemTransaction == 'E') {
      let alert = this.alertCtrl.create();
      alert.setTitle('Select Item To Exchange With');

      for (var i = 0; i < this.items.length; i++) {
        alert.addInput({
          type: 'radio',
          label: this.items[i].name,
          value: this.items[i].id,
        });
      }
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          console.log("selected item id" , data);
          transactionDetails.RequesterItemId = data;
          transactionDetails.ProviderItemId = this.itemid;
          this.placeTransaction(transactionDetails);
        }
      });
      alert.present();
    }else{
      transactionDetails.ProviderItemId = this.itemid;
      this.placeTransaction(transactionDetails);
    }
  }

  placeTransaction(transactionDetails){
    this.trancactionProvider.addTransaction(transactionDetails).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Yalla Done successfully!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.viewCtrl.dismiss();
    }).catch(err => {
      console.log("yalla error :", err);
      let toast = this.toastCtrl.create({
        message: 'An Error Occurred !',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.viewCtrl.dismiss();
    });
  }

  deleteItem(){

    let alert = this.alertCtrl.create({
      title: 'Confirm Deletion',
      message: 'Do you want to delete this item?!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.viewitemProvder.deleteItem(this.itemid).then(()=>{
              let toast = this.toastCtrl.create({
                message: 'Item Deleted!',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              this.viewCtrl.dismiss();
            });            
          }
        }
      ]
    });
    alert.present();

  }

  editItem(){
    var itemData = {
      itemimg : this.itemimg,
      itemloc: this.itemloc,
      itemduration: this.itemduration,
      itemdes: this.itemdes,
      itemname: this.itemname,
      itemid: this.itemid,
      itemTransaction: this.itemTransaction
    }

    var modalPage = this.modalCtrl.create(EditItemPage,{ itemData: itemData});
    modalPage.present();
  }

}
