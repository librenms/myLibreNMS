import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DeviceProvider } from '../../providers/device/device-provider';
import { WirelessProvider } from '../../providers/device/wireless-provider';
import { Device } from '../../model/device';
@IonicPage({
    segment: 'devices/:id',
    name: 'host'
})
@Component({
    selector: 'page-host',
    templateUrl: 'host.html'
})

export class Host {
    id: number;
    device: Device;
    tab1: string;
    tab2: string;
    tab3: string;
    tab4: string;
    tab5: string;
    hasWireless: boolean = false;
    notification: boolean = true;
    constructor(public navCtrl: NavController, public navParams: NavParams, private devicePrvd: DeviceProvider,
        public popoverCtrl: PopoverController, private wireless: WirelessProvider) {
        this.tab1 = 'HostHome';
        this.tab2 = 'HealthPage';
        this.tab3 = 'HostGraph'
        this.tab4 = 'HostPortsPage';
        this.tab5 = 'HostWirelessPage';
        this.id = navParams.get('id');
        this.device = navParams.get('item');
        this.wireless.exists(this.id).then((response) => {
            this.hasWireless = response;
        })

    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create('PopoverMenu', { 'data': this.device });
        popover.present({
            ev: myEvent
        });
    }

    statusPopover(event, state) {
        let popover = this.popoverCtrl.create('StatusPopover', { 'state': state });
        popover.present({
            ev: event
        });
    }

    close() {
        this.notification = false;
    }
}
