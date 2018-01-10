import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	templateUrl: 'vlan.html'
})
export class Vlan {

	data: any;
	constructor(
		public viewCtrl: ViewController,
		params: NavParams,
	) {

		this.data = params.data.vlans;
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
}
