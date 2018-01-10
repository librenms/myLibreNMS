import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibreNMS } from '../../providers/libre-nms';

@IonicPage()
@Component({
    selector: 'page-groups',
    templateUrl: 'groups.html'
})
export class Groups {
    groups: any;
    constructor(public navCtrl: NavController, private api: LibreNMS, public navParams: NavParams) {
        this.api.get_device_groups().subscribe(data => {
            this.groups = data.groups;
        })
    }

    load_group(event, item) {
        this.navCtrl.push('Group', {
            item: item
        });
    }
}
