import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
    templateUrl: 'bill.html'
})
export class Bill {
    bill_data: any;
    constructor(
        public viewCtrl: ViewController,
        params: NavParams,
    ) {
        this.bill_data = params.data;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
