import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { DeviceProvider } from '../../../providers/device/device-provider';
import { GraphHelper } from '../../../providers/graph';

@IonicPage()
@Component({
    selector: 'page-host-graph',
    templateUrl: 'host-graph.html'
})
export class HostGraph {
    device: any;
    graphs: any = [];
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private devicePrvd: DeviceProvider,
        private graphHlpr: GraphHelper,
        public appCtrl: App) {

    }
    ionViewDidLoad() {
        this.devicePrvd.get(this.navParams.data).then((device => {
            this.device = device;
            this.get_graphs();
        }));
    }

    get_graphs() {
        this.devicePrvd.graphs(this.device.device_id).then(data => {
            data.forEach(graph => {
                this.graphHlpr.get(`devices/${this.device.device_id}/${encodeURIComponent(graph.name)}`, 'end-24h', 'now', 200, 100)
                    .then((data_graph: any) => {
                        this.graphs.push({
                            desc: graph.desc,
                            name: graph.name,
                            thumbnail: data_graph,
                            loaded: false
                        })
                    });
            })
        });
    }

    load_graph(event, item) {
        this.appCtrl.getRootNavs()[0].push('Graph', {
            graph: item,
            device: this.device
        });
    }

    load_thumbnail(name) {
        setTimeout(() => {
            name.loaded = true;
            this.graphHlpr.get(this.device.device_id, name.name)
                .then((data: any) => {
                    name.thumbnail = data;
                });
        }, 10);
    }
}
