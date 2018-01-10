import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LibreNMS } from '../../../providers/libre-nms';
import { DeviceProvider } from '../../../providers/device/device-provider';

@IonicPage()
@Component({
    selector: 'page-group',
    templateUrl: 'group.html'
})
export class Group {
    group: any;
    list: Array<{ device_id: number, hostname: string, hardware: string }>;
    items: Array<{ device_id: number, hostname: string, hardware: string }>;
    searchQuery: string = '';
    group_items: Array<{ device_id: number }>;

    constructor(public navCtrl: NavController, private api: LibreNMS, public navParams: NavParams, private devicePrvd: DeviceProvider) {
        this.group = navParams.get('item');
        this.list = [];
        this.initializeItems();
        this.items = [];
        this.api.get_group_devices(this.group.name).subscribe(response => {
            response.devices.forEach(device => {
                this.devicePrvd.get(device.device_id).then(device => {
                    this.items.push(device);
                })
            })
        })

        this.initializeItems();
    }
    device(event, item) {
        this.navCtrl.push('host', {
            id: item.device_id,
            item: item
        });
    }
    initializeItems() {
        this.items = this.list;
    }
    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.hostname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
}
