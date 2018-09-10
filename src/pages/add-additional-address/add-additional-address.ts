import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { PrimaryAddressProvider } from '../../providers/primary-address/primary-address';
import { ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-add-additional-address',
  templateUrl: 'add-additional-address.html',
})
export class AddAdditionalAddressPage {

  locationSet = false;
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
  constructor(public viewCtrl: ViewController, private profileProvider: ProfileProvider, private primaryAddress: PrimaryAddressProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private geolocation: GeolocationProvider, private myLocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimaryAddressPage');
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
    this.myLocation.getCurrentPosition()
      .then(locationdata => {
        this.locationSet = true;
        this.clickedCoordinates.lat = locationdata.coords.latitude;
        this.clickedCoordinates.lang = locationdata.coords.longitude;
        console.log("fitched coordenates : ", this.clickedCoordinates);
        this.geolocation.getAddress(this.clickedCoordinates.lat, this.clickedCoordinates.lang).subscribe(
          response => {
            console.log("address fetched : ", response);
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
    this.locationSet = true;
    this.clickedCoordinates.lat = event.coords.lat;
    this.clickedCoordinates.lang = event.coords.lng;
    this.geolocation.getAddress(this.clickedCoordinates.lat, this.clickedCoordinates.lang).subscribe(
      response => {
        console.log("address fetched : ", response);
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
  }
  addaddress() {
    var location = `${this.clickedCoordinates.lat},${this.clickedCoordinates.lang}`;
    this.addressComponents.location = location;
    alert(JSON.stringify(this.addressComponents))
    this.profileProvider.addadditionaladdress(this.addressComponents).subscribe(
      response => {
        if (response.message == "address added successfully") {
          console.log(response.message);
          this.viewCtrl.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Address added!',
            buttons: ['Ok']
          });
          alert.present();
        }
      });
  }

  close() {
    this.viewCtrl.dismiss();
  }



}
