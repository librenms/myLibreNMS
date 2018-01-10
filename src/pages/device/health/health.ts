import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { DeviceProvider } from '../../../providers/device/device-provider';
import { SensorProvider } from '../../../providers/device/sensor-provider';
import { GraphHelper } from '../../../providers/graph';

@IonicPage()
@Component({
    selector: 'page-health',
    templateUrl: 'health.html'
})
export class HealthPage {
    device: any;
    health: Array<{ graph: any, name: string, description: string }>;
    height: number;
    width: number;
    constructor(public navCtrl: NavController, public appCtrl: App,
        public navParams: NavParams, private deviceHlpr: DeviceProvider, private sensor: SensorProvider, private graphHlpr: GraphHelper) {
        this.health = [];
        this.height = 200;
        this.width = window.innerWidth;
    }

    ionViewDidLoad() {
        this.deviceHlpr.get(this.navParams.data).then((device => {
            this.device = device;
            this.loadHealthGraphs();
        }))
    }

    loadHealthGraphs() {
        this.sensor.all(this.device.device_id).then((sensors: any[]) => {
            sensors.forEach(sensor => {
                this.graphHlpr.get(`devices/${this.device.device_id}/graphs/health/${sensor.name}`, 'end-1w', 'now', 200, 100)
                    .then(graph => {
                        this.health.push({
                            graph: graph,
                            name: sensor.name,
                            description: sensor.desc
                        })
                    }, error => {
                        console.error(error);
                    });
            });
        });
    }

    /**
     * Change View to graph Page
     * @param event Event
     * @param item Graph item to load
     */
    load_graph(event, item) {
        let tempDevice = this.device;
        this.appCtrl.getRootNavs()[0].push('Graph', {
            graph: item,
            device: tempDevice
        });
    }

}
