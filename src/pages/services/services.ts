import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-services',
    templateUrl: 'services.html'
})
export class ServicesPage {
    tab1: any;
    tab2: any;
    tab3: any;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.tab1 = 'ServicesCritPage';
        this.tab2 = 'ServicesWarningPage';
        this.tab3 = 'ServicesGoodPage';
    }
}
