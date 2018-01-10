import { Component } from '@angular/core';

import { IonicPage, ViewController, ToastController } from 'ionic-angular';
import { DeviceProvider } from '../../../providers/device/device-provider';
@IonicPage({
    name: 'new-device'
})
@Component({
    selector: 'new-device-model',
    templateUrl: 'new-device.html'
})
export class NewDevice {
    server: any;
    loading: boolean;
    more: boolean;
    constructor(
        public viewCtrl: ViewController,
        private toastCtrl: ToastController,
        private devicePrvd: DeviceProvider
    ) {
        this.server = {};
        this.server.version = 'v2c';
        this.server.transport = 'udp';
        this.server.port = '161';
        this.loading = false;
        this.more = false;
    }
    save() {
        this.loading = true;
        let submit_data = {};
        if (this.server.version == 'v3') {
            submit_data = {
                'hostname': this.server.hostname,
                'version': this.server.version,
                'port': this.server.port,
                'transport': this.server.transport,
                'authlevel': this.server.authLevel,
                'authname': this.server.authname,
                'authpass': this.server.authpass,
                'authalgo': this.server.authalgo,
                'cryptopass': this.server.cryptopass,
                'cryptoalgo': this.server.cryptoalgo
            };
        }
        else {
            submit_data = { 'hostname': this.server.hostname, 'version': this.server.version, 'port': this.server.port, 'transport': this.server.transport, 'community': this.server.community };
        }


        this.devicePrvd.add(submit_data).then(data => {
            this.presentToast("Added new Device");
            this.viewCtrl.dismiss();
            this.loading = false;
        }).catch(error => {
            this.loading = false;
            this.presentToast(error.status + ':' + error.statusText + ' - ' + error.json().message);
        });
    }

    inputs() {
        if (this.server.version == 'v3') {
            this.more = true;
        }
        else {
            this.more = false;
        }
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

}
