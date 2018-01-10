import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalAlertProvider } from '../../providers/alert-provider';
import { Observable } from 'rxjs/Rx';
import { Alert } from '../../model/alert';

@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-alerts',
    templateUrl: 'alerts.html'
})
export class AlertsPage {
    tab1: any;
    tab2: any;
    live: number;
    muted: number;
    mySub: any;
    constructor(public navCtrl: NavController, public navParams: NavParams, private alrtPrvd: GlobalAlertProvider) {
        this.tab1 = 'AlertsLivePage';
        this.tab2 = 'AlertsAckPage';
        this.getAlerts();
        this.mySub = Observable.interval(100 * 60).subscribe(x => {
            this.getAlerts();
        });
    }
    ionViewWillLeave() {
        this.mySub.unsubscribe();
    }
    getAlerts() {
        this.alrtPrvd.get(1).then((data: Alert[]) => {
            this.live = data.length;
        })
        this.alrtPrvd.get(2).then((data: Alert[]) => {
            this.muted = data.length;
        })
    }
}
