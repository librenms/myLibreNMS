import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { PortProvider } from '../../../providers/device/port-provider';
import { GraphHelper } from '../../../providers/graph';
import { DeviceProvider } from '../../../providers/device/device-provider';

import { Port } from '../../../model/port';
@IonicPage()
@Component({
    selector: 'page-host-ports',
    templateUrl: 'host-ports.html'
})

export class HostPortsPage {
    device: any;
    graphs: any = [];
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public appCtrl: App,
        private deviceHlpr: DeviceProvider,
        private graphHlpr: GraphHelper,
        private portPrvd: PortProvider) {
    }

    ionViewDidLoad() {
        this.deviceHlpr.get(this.navParams.data).then((device => {
            this.device = device;
            this.loadPorts();
        }))
    }

    loadPorts() {
        this.portPrvd.get(this.device.device_id).then((ports: Port[]) => {
            ports.forEach((port) => {
                this.graphHlpr.get(`devices/${this.device.hostname}/ports/${encodeURIComponent(port.ifName)}/port_bits`, 'end-24h', 'now', 200, 100)
                    .then((data_graph: any) => {
                        this.graphs.push({
                            ifName: port.ifName,
                            thumbnail: data_graph
                        })
                    });
            })
        });
    }
    load_graph(event, item) {
        this.appCtrl.getRootNavs()[0].push('PortPacketsPage', {
            graph: item,
            device: this.device
        });
    }
}
