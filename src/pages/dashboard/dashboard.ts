import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';
import { LibreNMS } from '../../providers/libre-nms';
import { GlobalAlertProvider } from '../../providers/alert-provider';
import { DeviceProvider } from '../../providers/device/device-provider';
import { Observable } from 'rxjs/Rx';
import { Device } from '../../model/device';
import { Alert } from '../../model/alert';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class Dashboard {
    states: any;
    bad: Array<{ device_id: number, hostname: string }>;
    bad_count: number;
    good_count: number;
    disabled_count: number;
    ignore: number;
    alerts: number;
    activeAlerts: Array<{}>;
    down_obsv: any;
    url: string = '';

    constructor(public navCtrl: NavController,
        private api: LibreNMS,
        private alertPrvd: GlobalAlertProvider,
        private devicePrvd: DeviceProvider,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController) {
        this.bad = [];
        this.good_count = 0;
        this.disabled_count = 0;
        this.alerts = 0;
        this.ignore = 0;
        this.api.get_credentials().then((credentials: any) => {
            this.url = credentials.url;
        });
        this.checkVersion();
    }
    refresh() {
        this.bad = [];
        this.good_count = 0;
        this.disabled_count = 0;
        this.alerts = 0;

        this.devicePrvd.all().then(devices => {
            this.good_count = devices.filter((device: Device) => device.isGood()).length;
            this.bad = devices.filter((device: Device) => device.isDown());
            this.disabled_count = devices.filter((device: Device) => device.isDisabled()).length;
            this.ignore = devices.filter((device: Device) => device.isIgnored()).length;
        });

        this.alertPrvd.get(1).then((data: Alert[]) => {
            this.alerts = data.length;
        })
    }

    ionViewDidLoad() {
        this.refresh();
        this.down_obsv = Observable.interval(500 * 60).subscribe(x => {
            this.refresh();
        });
    }
    ionViewWillLeave() {
        this.down_obsv.unsubscribe();
    }
    device(event, item) {
        this.navCtrl.push('host', {
            item: item,
            id: item.device_id
        });
    }

    checkVersion() {
        this.api.getRequest('/system').subscribe((response) => {
            if (response.status == 'error') {
                let warning = this.toastCtrl.create({
                    message: "Your LibreNMS server may be out of date, this could cause the application to crash. Be warned",
                    duration: 5000
                });
                warning.present();
            }
        });
    }
}
