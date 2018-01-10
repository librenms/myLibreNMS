import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { DeviceProvider } from '../../../providers/device/device-provider';
import { Device } from '../../../model/device'

@IonicPage()
@Component({
    templateUrl: 'services-modal.html'
})
export class ServicesModal {
    data: any;
    newServer: any;
    device: any;
    constructor(
        public viewCtrl: ViewController,
        public params: NavParams,
        private devicePrvd: DeviceProvider
    ) {
        this.data = params.data;
        this.devicePrvd.get(this.data.device_id)
            .then((device: Device) => {
                console.log(device);
                this.device = device;
            });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
