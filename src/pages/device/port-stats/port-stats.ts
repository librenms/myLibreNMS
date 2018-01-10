import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LibreNMS } from '../../../providers/libre-nms';
import { GraphHelper } from '../../../providers/graph';

@IonicPage()
@Component({
    selector: 'page-graph',
    templateUrl: '../graph/graph.html'
})
export class PortStatsPage {
    device: any;
    graph: any;
    packet: any;
    page: any = {
        'day_graph': { 'loading': true, 'url': null },
        'week_graph': { 'loading': true, 'url': null },
        'month_graph': { 'loading': true, 'url': null },
        'year_graph': { 'loading': true, 'url': null }
    };
    constructor(public navCtrl: NavController,
        private api: LibreNMS,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        private graphHlpr: GraphHelper) {
        this.device = navParams.get('device');
        this.graph = navParams.get('graph');
        this.packet = navParams.get('packet');
        this.graph.desc = this.packet.name;

        this.graphHlpr.series(`devices/${encodeURIComponent(this.device.hostname)}/ports/${encodeURIComponent(this.graph.ifName)}/${this.packet.name}`).subscribe((data) => {
            this.page[data.timeframe].loading = false;
            this.page[data.timeframe].url = data.url;
        })
    }
}
