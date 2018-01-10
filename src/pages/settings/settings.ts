import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibreNMS } from '../../providers/libre-nms';

@IonicPage()
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    private creds: any = {};
    constructor(public navCtrl: NavController, public navParams: NavParams, public api: LibreNMS) { }

    ionViewDidLoad() {
        this.api.get_credentials().then((credentials) => {
            this.creds = credentials;
        })
    }

    logout() {
        this.api.logout();
        this.navCtrl.setRoot('Login');
    }
}
