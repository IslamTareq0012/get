import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GeolocationProvider {

  constructor(public http: Http) {
    console.log('Hello GeolocationProvider Provider');
  }

  getLocation(address){
    var geolocationData : any;
    var APIurl =  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAQDwDtkYyYrhympS3EvBAliy7NZbhfIac`;
    return this.http.get(APIurl).map(res => res.json());
    //return geolocationData;
  }

  getAddress(lat , long){
    var address : any;
    var APIurl =  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyAQDwDtkYyYrhympS3EvBAliy7NZbhfIac`;
    return this.http.get(APIurl).map(res => res.json());
    //return address;
  }

}
