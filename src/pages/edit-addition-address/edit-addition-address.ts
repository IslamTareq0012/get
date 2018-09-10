import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { PrimaryAddressProvider } from '../../providers/primary-address/primary-address';
import { ProfileProvider } from '../../providers/profile/profile'


@Component({
  selector: 'page-edit-addition-address',
  templateUrl: 'edit-addition-address.html',
})
export class EditAdditionAddressPage {
  locationSet = false;
  addressid: any;
  Addresses = []
  public Address: any;

  clickedCoordinates = {
    lang: null,
    lat: null
  }
  addressComponents = {
    country: null,
    city: null,
    area: null,
    mobile: null,
    location: null
  }

  constructor(private profileProvider: ProfileProvider, private primaryAddress: PrimaryAddressProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private geolocation: GeolocationProvider, private myLocation: Geolocation, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAdditionAddressPage');

    this.addressid = this.navParams.get('addressid');
    this.profileProvider.details().subscribe(res => {
      this.Addresses = res.user.Address;
      for (var i = 0; i < this.Addresses.length; i++) {
        if (this.Addresses[i].id == this.addressid) {
          this.addressComponents.country = this.Addresses[i].country;
          this.addressComponents.city = this.Addresses[i].city;
          this.addressComponents.area = this.Addresses[i].area;
          this.addressComponents.location = this.Addresses[i].location;
        }
      }
    });
  }


  // ******* NOT A DUMMY CODE, THISE FOR DETAILED ADDRESS CONVERSION TO LAT & LONG COORDENATES ********* 

  // searchLocation() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Set Address On Map',
  //     inputs: [
  //       {
  //         name: 'adress',
  //         placeholder: 'Your Primary Address'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Search',
  //         handler: data => {
  //           // get address lang & lat
  //           var geolocation = this.geolocation.getLocation(data.adress);
  //           this.clickedCoordinates = geolocation.results[0].geometry.location;
  //           this.locationSet = true;

  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  useMyLocation() {
    console.log("my location clicked !!");
    this.myLocation.getCurrentPosition()
      .then(locationdata => {
        this.clickedCoordinates.lat = locationdata.coords.latitude;
        this.clickedCoordinates.lang = locationdata.coords.longitude;
        this.locationSet = true;
        this.geolocation.getAddress(this.clickedCoordinates.lat, this.clickedCoordinates.lang).subscribe(
          response => {
            console.log("response of location : ", response);
            if (response.results[2].address_components[2].long_name) {
              this.addressComponents.country = response.results[2].address_components[2].long_name;
              this.addressComponents.city = response.results[2].address_components[1].long_name;
              this.addressComponents.area = response.results[2].address_components[0].long_name;
      
            } else {
              this.addressComponents.country = response.results[2].address_components[3].long_name;
              this.addressComponents.city = response.results[2].address_components[1].long_name;
              this.addressComponents.area = response.results[2].address_components[0].long_name;
            }
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onMapClick(event) {
    this.clickedCoordinates.lat = event.coords.lat;
    this.clickedCoordinates.lang = event.coords.lng;
    this.locationSet = true;

    this.geolocation.getAddress(this.clickedCoordinates.lat, this.clickedCoordinates.lang).subscribe(
      response => {
        console.log("response of location : ", response);
        if (!response.results[2].address_components[2].long_name) {
          this.addressComponents.country = response.results[2].address_components[2].long_name;
        } else {
          this.addressComponents.country = response.results[2].address_components[3].long_name;

        }
        this.addressComponents.city = response.results[2].address_components[2].long_name;
        this.addressComponents.area = response.results[2].address_components[1].long_name;
      });
  }

  editadditional() {
    var location = `${this.clickedCoordinates.lat},${this.clickedCoordinates.lang}`;
    this.addressComponents.location = location;
    console.log("coordinates: ", location);
    console.log("coordenats :", this.addressComponents.location);
    this.primaryAddress.editadditionaladdress(this.addressid, this.addressComponents).subscribe(
      response => {
        if (response.message == "address edited successfully") {
          console.log(response.message);
          let alert = this.alertCtrl.create({
            title: 'Address changed!',
            buttons: ['Ok']
          });
        }
        this.viewCtrl.dismiss();
      });
  }
  close() {
    this.viewCtrl.dismiss();
  }

}
