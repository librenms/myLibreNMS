import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { WirelessProvider } from '../../../providers/device/wireless-provider';
import { GraphHelper } from '../../../providers/graph';
import { DeviceProvider } from '../../../providers/device/device-provider';

import { Wireless } from '../../../model/wireless';
@IonicPage()
@Component({
    selector: 'page-host-wireless',
    templateUrl: 'host-wireless.html'
})

export class HostWirelessPage {
    device: any;
    graphs: any = [];
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appCtrl: App,
        private deviceHlpr: DeviceProvider,
        private graphHlpr: GraphHelper,
        private wirelessPrvd: WirelessProvider) {
    }

    ionViewDidLoad() {
        this.deviceHlpr.get(this.navParams.data).then((device => {
            this.device = device;
            this.load();
        }))
    }

    /**
     * Load Wireless sensors for device
     */
    load() {
        this.wirelessPrvd.get(this.device.device_id).then((sensors: Wireless[]) => {
            sensors.forEach((sensor) => {
                this.graphHlpr.get(`devices/${this.device.hostname}/graphs/wireless/${encodeURIComponent(sensor.name)}`, 'end-24h', 'now', 200, 100)
                    .then((data_graph: any) => {
                        this.graphs.push({
                            description: sensor.description,
                            name: sensor.name,
                            thumbnail: data_graph
                        })
                    });
            })
        });
    }

    /**
     * Change View to graph Page
     * @param event Event
     * @param item Graph item to load
     */
    load_graph(event, item) {
        this.appCtrl.getRootNavs()[0].push('Graph', {
            graph: item,
            device: this.device
        });
    }
}
