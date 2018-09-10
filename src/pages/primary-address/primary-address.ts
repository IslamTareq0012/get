import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ThankyouPage } from '../thank-you/thank-you';

import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { PrimaryAddressProvider } from '../../providers/primary-address/primary-address';
import { ProfileProvider } from '../../providers/profile/profile';
@Component({
  selector: 'page-primary-address',
  templateUrl: 'primary-address.html',
})
export class PrimaryAddressPage {
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
  public Address: any;
  constructor(private profileProvider: ProfileProvider, private primaryAddress: PrimaryAddressProvider, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private geolocation: GeolocationProvider, private myLocation: Geolocation) {
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
        this.clickedCoordinates.lat = locationdata.coords.latitude;
        this.clickedCoordinates.lang = locationdata.coords.longitude;
        this.locationSet = true;

        this.geolocation.getAddress(this.clickedCoordinates.lat, this.clickedCoordinates.lang).subscribe(
          response => {
            if (response.results[2].address_components[2].long_name) {
              this.addressComponents.country = response.results[2].address_components[2].long_name;
              this.addressComponents.city = response.results[2].address_components[1].long_name;
              this.addressComponents.area = response.results[2].address_components[0].long_name;
              this.clickedCoordinates.lat = locationdata.coords.latitude;
              this.clickedCoordinates.lang = locationdata.coords.longitude;
      
      
            } else {
              this.addressComponents.country = response.results[2].address_components[3].long_name;
              this.addressComponents.city = response.results[2].address_components[1].long_name;
              this.addressComponents.area = response.results[2].address_components[0].long_name;
              this.clickedCoordinates.lat = locationdata.coords.latitude;
              this.clickedCoordinates.lang = locationdata.coords.longitude;
      
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
        if (response.results[2].address_components[2].long_name) {
          this.addressComponents.country = response.results[2].address_components[2].long_name;
          this.addressComponents.city = response.results[2].address_components[1].long_name;
          this.addressComponents.area = response.results[2].address_components[0].long_name;
          this.clickedCoordinates.lat = event.coords.lat;
          this.clickedCoordinates.lang = event.coords.lng;
      

        } else {
          this.addressComponents.country = response.results[2].address_components[3].long_name;
          this.addressComponents.city = response.results[2].address_components[1].long_name;
          this.addressComponents.area = response.results[2].address_components[0].long_name;
          this.clickedCoordinates.lat = event.coords.lat;
          this.clickedCoordinates.lang = event.coords.lng;
      
        }
      });

  }

  addaddress() {
    var location = `${this.clickedCoordinates.lat},${this.clickedCoordinates.lang}`;
    console.log("coordenats :", location);
    this.addressComponents.location = location;
    console.log("adderss of user :" ,this.addressComponents);
    this.primaryAddress.addprimaryaddress(this.addressComponents).subscribe(
      response => {
        if (response.message == "address added successfully") {
          console.log(response.message);
          this.Address = response.address;
          localStorage.setItem('address', JSON.stringify(this.Address));
          let alert = this.alertCtrl.create({
            title: 'Address added!',
            buttons: ['Ok']
          });
          alert.present();
          this.navCtrl.setRoot(ThankyouPage);
        }

      }
    )
  }

}
