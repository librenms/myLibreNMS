import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GlobalBillProvider } from '../../providers/bill-provider';
@IonicPage()
@Component({
    selector: 'page-bills',
    templateUrl: 'bills.html'
})
export class BillsPage {
    bills: any = [];
    modal: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private billHlpr: GlobalBillProvider, public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        this.billHlpr.all().then(data => {
            this.bills = data;
        });
    }
    load_bill(data) {
        this.modal = this.modalCtrl.create('Bill', data);
        this.modal.present();
    }
}
