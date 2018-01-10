import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibreNMS } from '../../../providers/libre-nms';

import { GraphHelper } from '../../../providers/graph';
@IonicPage({
    segment: 'graphs'
})
@Component({
    selector: 'page-graph',
    templateUrl: 'graph.html'
})
export class Graph {
    graph: any;
    device: any;
    width: number;
    height: any;
    page: any = {
        'day_graph': { 'loading': true, 'url': null },
        'week_graph': { 'loading': true, 'url': null },
        'month_graph': { 'loading': true, 'url': null },
        'year_graph': { 'loading': true, 'url': null }
    };
    constructor(public navCtrl: NavController, private api: LibreNMS, public navParams: NavParams, private graphHlpr: GraphHelper) {
        this.height = '200';
        this.device = navParams.get('device');
        this.graph = navParams.get('graph');
        this.width = window.innerWidth;

        this.graphHlpr.series(`devices/${this.device.device_id}/${encodeURIComponent(this.graph.name)}`)
            .subscribe(data => {
                this.page[data.timeframe].loading = false;
                this.page[data.timeframe].url = data.url;
            });
    }
}
