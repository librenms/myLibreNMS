import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { GlobalAlertProvider } from '../../../providers/alert-provider';
import { DeviceProvider } from '../../../providers/device/device-provider';

import { Alert } from '../../../model/alert';
import { Device } from '../../../model/device';
@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-alerts-live',
    templateUrl: 'alerts-live.html'
})
export class AlertsLivePage {
    alerts: Alert[];
    modal: any;
    constructor(public navCtrl: NavController, private devicePrvd: DeviceProvider, public navParams: NavParams, private alrtPrvd: GlobalAlertProvider, public toastCtrl: ToastController, public modalCtrl: ModalController) {

    }

    ionViewDidEnter() {
        this.load_alerts();
    }

    load_alerts() {
        this.alerts = [];
        this.alrtPrvd.get(1).then((alerts: Alert[]) => {
            this.alerts = alerts;
        });
    }

    acknowledge(event, item) {
        this.alrtPrvd.ackowledge(item.id).then(data => {
            this.presentToast();
            this.alerts.forEach((alert, index) => {
                if (alert.id == item.id) {
                    this.alerts.splice(index, 1);
                }
            })
        }, error => {
            console.error(error);
        })
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Alert acknowledged...',
            duration: 3000,
            position: 'top'
        });

        toast.present();
    }

    rule(data) {
        this.modal = this.modalCtrl.create('RuleModal', data);
        this.modal.present();
    }

    device(event, item) {
        this.devicePrvd.get(item.device_id).then((device: Device) => {
            this.navCtrl.push('host', {
                id: item.device_id,
                item: device
            });
        })
    }
}
