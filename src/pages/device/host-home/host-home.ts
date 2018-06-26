import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibreNMS } from '../../../providers/libre-nms';
import { GraphHelper } from '../../../providers/graph';

import { DeviceProvider } from '../../../providers/device/device-provider';
import { Device } from '../../../model/device';

@IonicPage()
@Component({
    selector: 'page-host-home',
    templateUrl: 'host-home.html'
})
export class HostHome {
    id: number;
    stats: any;
    width: any = window.innerWidth;
    traffic_graph: any;
    loading: boolean = true;
    device: Device = null;
    error: object = {
        message: null
    };
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private api: LibreNMS,
        private graphHlpr: GraphHelper,
        private devicePrvd: DeviceProvider) {
    }
    ionViewDidLoad() {
        this.id = this.navParams.data;
        this.devicePrvd.get(this.id).then(device => {
            this.stats = device;
            this.device = device;
        });

        this.graphHlpr.get(`devices/${this.id}/device_bits`, 'end-24h', 'now', this.width, 200).then((data: any) => {
            this.traffic_graph = data;
            this.loading = false;
        })
        .catch( (message) => {
            this.error['message'] = message;
        });
    }
    launch(ip) {
        window.open("http://" + ip, "_system", "location=true");
    };

}
