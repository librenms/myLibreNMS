import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
@IonicPage()
@Component({
    templateUrl: 'ipsec.html'
})
export class Ipsec {
    data: any;
    constructor(
        public viewCtrl: ViewController,
        params: NavParams,
    ) {
        this.data = params.data.ipsec;
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
