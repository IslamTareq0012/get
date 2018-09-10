import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { TransactionProvider } from '../../providers/transaction/transaction';
import { ProfileProvider } from '../../providers/profile/profile';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  constructor(public profileProvider: ProfileProvider, private toastCtrl: ToastController, private transactionProvider: TransactionProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  pendingRequests: any;
  userID : any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');

    this.transactionProvider.viewTransactions().then((transactions) => {
      this.pendingRequests = transactions.pendingTransactions;
      console.log("pending requests :", this.pendingRequests);
    }).catch(err => {
      console.log("getting notification erro ", err);
    });
    this.profileProvider.details().subscribe(
      response => {
        console.log(response);
        this.userID = response.user.id;
        console.log("user id : " , this.userID);
      });
  }

  responseRequest(requestID, itemID, response) {

    var transactionData = {
      "id": requestID,
      "ProviderItemId": itemID,
      "status": response,
    }

    console.log("data : ", transactionData);

    if (response === 'Approved') {
      this.transactionProvider.editTransactionStatus(transactionData).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Request Accepted!',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        for (var i = 0; i < this.pendingRequests.length; i++) {

          if (this.pendingRequests[i].id == requestID) {
            this.pendingRequests.splice(i, 1);
          }
        }
      }).catch(err => {
        console.log("respose error", err);
      });
    } else if (response === 'Rejected') {
      this.transactionProvider.editTransactionStatus(transactionData).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Request Rejected!',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        for (var i = 0; i < this.pendingRequests.length; i++) {

          if (this.pendingRequests[i].id == requestID) {
            this.pendingRequests.splice(i, 1);
          }
        }
      }).catch(err => {
        console.log("respose error", err);
      });
    }
  }

}
