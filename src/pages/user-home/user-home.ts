import { Component, NgZone } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ItemDetailsPage } from '../item-details/item-details';
import {ItemOwnerPage} from '../../pages/item-owner/item-owner';

import { ListitemsProvider } from '../../providers/list-items/list-items';
import { ProfileProvider } from '../../providers/profile/profile';
import { CategoryProvider } from '../../providers/category/category';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { Location } from '../../Models/locationModel';
import { ViewItemProvider } from '../../providers/view-item/view-item';

import * as _ from 'lodash';

@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})

export class UserHomePage {
  clickedCoordinates = {
    lang: null,
    lat: null
  }
  itemCords = [];
  selectedCity_mapView = "cairo";
  viewMap = false;
  useraddcity: any;
  items = [];
  filter: any;
  newest: boolean;
  nearest: boolean;
  give: boolean;
  exchange: boolean;
  take: boolean;
  private: boolean;
  pub: boolean;
  city: boolean;
  default: boolean = true;
  param: any;
  Addresses = [];
  itemids = [];
  x = " ";
  categories: any;
  imgbasurl: any = "http://54.163.41.235:1337";
  ran: any;
  user: any = { fullName: '', email: '', mobileNumber: '', image: '', Address: [], id: null, rating : null  };
  isGrid = false;
  showFooter = false;
  userImage : any;
  itemOwnerName: any;
  itemOnMapImages = [];
  itemNameOnMap: any;
  itemOwnerArea: any;
  ownerRatin : any;
  itemOwnerID : any;
  originalItems : any;
  filteredItems: any;
  filterCategory : any;
  constructor(public viewitemProvder: ViewItemProvider, public modalCtrl: ModalController, private zone: NgZone, private geolocation: GeolocationProvider, private myLocation: Geolocation, private categoryProvider: CategoryProvider, private profileProvider: ProfileProvider, private listItemProvider: ListitemsProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad UserHomePage');

    this.profileProvider.details().subscribe(
      response => {
        this.Addresses = response.user.Address;
        console.log(response.user);
        this.useraddcity = response.user.Address[0].city;
        this.user.fullName = response.user.fullName;
        this.user.email = response.user.email;
        this.user.id = response.user.id;
        this.user.mobileNumber = response.user.mobileNumber;
        this.user.Address = response.user.Address;
        this.user.image = response.user.image;
        this.user.rating = response.user.rating;        
        this.Addresses = this.user.Address;
        console.log(this.useraddcity);
        this.ran = Math.random();
        console.log("user id", this.user.id);

      });

    this.listItemProvider.listitems().then(result => {
      console.log("items :", result);
      this.originalItems = result;
      this.items = result;
    });

    this.categoryProvider.getcategories().toPromise().then(res => {
      this.categories = res;
    }).catch(err => {
      console.log("error categories", err);
    });

    this.myLocation.getCurrentPosition()
      .then(locationdata => {
        this.clickedCoordinates.lat = locationdata.coords.latitude;
        this.clickedCoordinates.lang = locationdata.coords.longitude;
        console.log("my location : ", locationdata);
        this.geolocation.getAddress(this.clickedCoordinates.lat, this.clickedCoordinates.lang).subscribe(
          response => {
            console.log("response of location : ", response);
          });
      }).catch(err => {
        console.log(err);
      });

  }


  markerIconUrl() {
    return "assets/imgs/rsz_13147.png"
  }
  showListView() {
    this.isGrid = false;
  }
  showGridView() {
    this.isGrid = true;
  }
  selectoption() {
    //this.filter = val;
    console.log(this.filter)
    if (this.filter == "give") {
      this.default = false;
      this.newest = false;
      this.nearest = false;
      this.give = true;
      this.exchange = false;
      this.take = false;
      this.private = false;
      this.pub = false;
      this.city = false;
      this.listItemProvider.listgiveitems().subscribe(response => {
        console.log(response);
        console.log("selection : ", this.filter);
        console.log("is give ?!", this.give);
        console.log("is default ", this.default);
        this.items = response;
      });

    }
    else if (this.filter == "take") {
      this.default = false;
      this.newest = false;
      this.nearest = false;
      this.give = false;
      this.exchange = false;
      this.take = true;
      this.private = false;
      this.pub = false;
      this.city = false;
      this.param = "T"
      this.listItemProvider.listtakeitems().subscribe(
        response => {
          console.log(response);
          this.items = response;
        });
    }
    else if (this.filter == "exchange") {
      this.default = false;
      this.newest = false;
      this.nearest = false;
      this.give = false;
      this.exchange = true;
      this.take = false;
      this.private = false;
      this.pub = false;
      this.city = false;
      this.param = "E"
      this.listItemProvider.listexitems().subscribe(
        response => {
          console.log(" exchange items :", response);
          this.items = response;
        })
    }
    else if (this.filter == "private") {
      this.default = false;
      this.newest = false;
      this.nearest = false;
      this.give = false;
      this.exchange = false;
      this.take = false;
      this.private = true;
      this.pub = false;
      this.city = false;
      this.listItemProvider.listprivate().subscribe(
        response => {
          console.log(response);
          this.items = response;
        })
    }
    else if (this.filter == "public") {
      this.default = false;
      this.newest = false;
      this.nearest = false;
      this.give = false;
      this.exchange = false;
      this.take = false;
      this.private = false;
      this.pub = false;
      this.city = true;
      this.listItemProvider.listpub().subscribe(
        response => {
          console.log(response);
          this.items = response;
        })
    }
    else if (this.filter == "newest") {
      this.default = false;
      this.newest = true;
      this.nearest = false;
      this.give = false;
      this.exchange = false;
      this.take = false;
      this.private = false;
      this.pub = false;
      this.city = false;
      this.listItemProvider.listnearest(this.useraddcity).subscribe(
        response => {
          console.log(response);
          this.items = response;
          this.items.sort(function (a, b) {
            var dateA: any = new Date(a.createdAt);
            var dateB: any = new Date(b.createdAt);
            return dateA - dateB;
          });
        })
    }

    else if (this.filter == "nearest") {
      this.default = false;
      this.newest = false;
      this.nearest = true;
      this.give = false;
      this.exchange = false;
      this.take = false;
      this.private = false;
      this.pub = false;
      this.city = false;
      this.listItemProvider.listitems().then(
        response => {
          console.log(response);
          this.items = response;
        });
    }

  }


  itempage(id) {
    let obj = {
      "id": id
    }
    var modalPage = this.modalCtrl.create(ItemDetailsPage, { itemid: obj, userDetails: this.user });
    modalPage.present();
  }
  homeMap() {
    this.itemCords = [];
    this.viewMap = true;
    this.geolocation.getLocation(this.selectedCity_mapView).toPromise().then(res => {
      console.log("fitched cords of city", res);
      this.clickedCoordinates.lang = res.results[0].geometry.location.lng;
      this.clickedCoordinates.lat = res.results[0].geometry.location.lat;
      this.updateMap(null);
    }).catch(err => {
      console.log("error city location", err);
    });
    this.extractItemsCords(this.items);
    console.log("items cords : ", this.itemCords);
  }
  extractItemsCords(items) {
    for (var i = 0; i < items.length; i++) {
      var Cords = {} as Location;
      Cords.lat = parseFloat(this.items[i].location.location.split(",")[0]);
      Cords.lng = parseFloat(this.items[i].location.location.split(",")[1]);
      Cords.id = parseInt(this.items[i].id);
      this.itemCords.push(Cords);
    }
  }
  showItemAndOwnerOnMap(id) {
    console.log("id of item from map : ", id);
    this.showFooter = true;
    this.viewitemProvder.viewitem(id).subscribe(res => {
      console.log("item data from map", res);
      this.userImage = res.Provider.image;
      this.itemOwnerName = res.Provider.fullName;
      this.ownerRatin = res.Provider.rating;
      this.itemOwnerID = res.Provider.id;
      this.itemOwnerArea = res.Provider.Address[0].area;
      this.itemOnMapImages[0] = res.item.images[0];
      this.itemOnMapImages[1] = res.item.images[1];
      this.itemOnMapImages[2] = res.item.images[3];
      this.itemNameOnMap = res.item.name;  
    });
  }
  viewItemOwner(){
    var itemsAndOwnserData ={
      ownerName : this.itemOwnerName,
      itemOwnerArea : this.itemOwnerArea,
      ownerImage : this.userImage,
      ownerRating : this.ownerRatin,
      ownerID : this.itemOwnerID,
      allItmes: null
    }
    this.listItemProvider.listitems().then(res=>{
      itemsAndOwnserData.allItmes = res;
      console.log("all items : ", res);
      var modalPage = this.modalCtrl.create(ItemOwnerPage , {itemsAndOwnserData : itemsAndOwnserData});
      modalPage.present();
    }).catch(err=>{
      console.log("fetching items error" , err);
    })

  }
  closeFooter() {
    this.showFooter = false;
  }
  typeFilter() {
    console.log("filter :" , String(this.filterCategory));
    this.filteredItems=  _.filter(this.originalItems , i => String( i.categoryID).includes(String(this.filterCategory)));
    console.log("filterd items : ", this.filteredItems);

    this.zone.run(() => {
      this.items = this.filteredItems;
      console.log("update view fired !");
    });
    
    console.log("items after filteration : " , this.items);    
  }
  homeList() {
    this.items = this.originalItems;
    this.viewMap = false;
  }
  searchLocation() {
    console.log("city selected", this.selectedCity_mapView);
    var cityName = "";
    this.selectedCity_mapView.trim();
    if (this.selectedCity_mapView.includes("Governorate")) {
      cityName = this.selectedCity_mapView.replace("Governorate", " ");
    }
    this.geolocation.getLocation(cityName).toPromise().then(res => {
      console.log("fitched cords of city", res);
      this.clickedCoordinates.lang = res.results[0].geometry.location.lng;
      this.clickedCoordinates.lat = res.results[0].geometry.location.lat;
      this.updateMap(null);
    }).catch(err => {
      console.log("error city location", err);
    });
  }
  updateMap(event) {
    this.zone.run(() => {
    });
  }
}
