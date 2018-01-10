import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { DeviceProvider } from '../../providers/device/device-provider';
import { Device } from '../../model/device';
@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'devices.html'
})
export class Devices {
    list: Device[] = [];
    items: Device[] = [];
    searchQuery: string = '';
    modal: any;
    constructor(public navCtrl: NavController,
        private devicePrvd: DeviceProvider,
        public navParams: NavParams, public loadingCtrl: LoadingController,
        public alertCtrl: AlertController, public modalCtrl: ModalController) {
        this.devicePrvd.all().then((devices: Device[]) => {
            this.items = devices;
            this.list = this.items;
        })
    }

    device(event, item) {
        this.navCtrl.push('host', {
            id: item.device_id,
            item: item
        });
    }
    initializeItems() {
        this.items = this.list;
    }
    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.hostname.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.sysName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
    showAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'Notice:',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    }

    add() {
        this.modal = this.modalCtrl.create('new-device');
        this.initializeItems();
        this.modal.present();
    }
}
