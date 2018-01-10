import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-port-packets',
    templateUrl: 'port-packets.html'
})
export class PortPacketsPage {
    types: Array<{ name: string, desc: string }>;
    device: any;
    graph: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
        this.device = navParams.get('device');
        this.graph = navParams.get('graph');
        this.types = [
            { 'name': 'port_bits', 'desc': 'Bits' },
            { 'name': 'port_nupkts', 'desc': 'Non Unicast' },
            { 'name': 'port_upkts', 'desc': 'Unicast' }
        ];
    }

    load_graph(event, item) {
        this.appCtrl.getRootNavs()[0].push('PortStatsPage', {
            graph: this.graph,
            device: this.device,
            packet: item
        });
    }
}
