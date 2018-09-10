import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { TransactionProvider } from '../../providers/transaction/transaction';

@Component({
  selector: 'page-my-requests',
  templateUrl: 'my-requests.html',
})
export class MyRequestsPage {

  activeOrdersOrHistory = true;
  activeRequests: any;
  imgbasurl: any = "http://54.163.41.235:1337";
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private transactionProvider: TransactionProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRequestsPage');

    this.transactionProvider.viewActiveTransactions().then((transactions) => {
      this.activeRequests = transactions.oldRequests;
      console.log("pending requests :", this.activeRequests);
    }).catch(err => {
      console.log("getting notification erro ", err);
    });
  }
  ActiveOrders() {
    this.activeOrdersOrHistory = true;
  }

  MyHistory() {
    this.activeOrdersOrHistory = false;
  }
  finishTransaction(requestID, itemID, requesterItemdID, response) {
    var transactionData = {
      "id": requestID,
      "ProviderItemId": itemID,
      "status": response,
      "RequesterItemId": requesterItemdID
    }

    let alert = this.alertCtrl.create({
      title: 'Confirm ending',
      message: 'Do you want to end this transaction?!',
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
            console.log('Buy clicked');
            this.transactionProvider.editTransactionStatus(transactionData).then(() => {
              let toast = this.toastCtrl.create({
                message: 'Transaction Finished!',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
              for (var i = 0; i < this.activeRequests.length; i++) {

                if (this.activeRequests[i].id == requestID) {
                  this.activeRequests.splice(i, 1);
                }
              }
            }).catch(err => {
              console.log("respose error", err);
            });
          }
        }
      ]
    });
    alert.present();
  }

}
