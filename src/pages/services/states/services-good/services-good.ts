import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { LibreNMS } from "../../../../providers/libre-nms";

@IonicPage()
@Component({
    selector: 'page-services-good',
    templateUrl: '../services-crit/services-crit.html'
})
export class ServicesGoodPage {
    items: any;
    modal: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private api: LibreNMS, public modalCtrl: ModalController) {
        this.items = [];
    }

    ionViewWillEnter() {
        this.api.list_services(0).subscribe(data => {
            this.items = data.services;
        }, error => {
            console.log(error);
        });
    }
    load_service(item) {
        this.modal = this.modalCtrl.create('ServicesModal', item);
        this.modal.present();
    }
}
