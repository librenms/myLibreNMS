import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
	templateUrl: 'more-services.html'
})
export class MoreServices {
	data: any;
	modal: any;
	constructor(
		public viewCtrl: ViewController,
		params: NavParams,
		public modalCtrl: ModalController
	) {
		this.data = params.data.services;
	}

	dismiss() {
		this.viewCtrl.dismiss();
	}
	load_service(item) {
		this.modal = this.modalCtrl.create('services-modal', item);
		this.modal.present();
	}
}
