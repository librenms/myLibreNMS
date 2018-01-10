import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController } from 'ionic-angular';

import { LibreNMS } from "../../providers/libre-nms";

@IonicPage()
@Component({
    template: `
    <ion-list>
      <ion-list-header>{{'DEVICE.MORE' | translate}}</ion-list-header>
      <button ion-item  (click)="openModal(0)">Logs</button>
      <button ion-item *ngIf="ipsec.count > 0" (click)="openModal(1,ipsec)">
        View IPsec</button>
      <button ion-item *ngIf="vlan.count > 0" (click)="openModal(2,vlan)">
        View Vlans</button>
      <button ion-item *ngIf="services.count > 1" (click)="openModal(3,services)">
        View Services</button>
    </ion-list>
  `
})
export class PopoverMenu {
    vlan: any = {};
    ipsec: any = {};
    device: any = {};
    modal: any;
    services: any = {};
    constructor(public viewCtrl: ViewController, private api: LibreNMS, public navParams: NavParams, public modalCtrl: ModalController) {
        this.device = navParams.data.data;

        this.api.list_vlan(this.device.device_id).subscribe(data => {
            this.vlan = data;
        });
        this.api.list_ipsec(this.device.device_id).subscribe(data => {
            this.ipsec = data;
        });
        this.api.get_host_services(this.device.device_id).subscribe(data => {
            this.services = data;
        });
    }

    close() {
        this.viewCtrl.dismiss();
    }
    openModal(modalTemplate, data = null) {
        this.viewCtrl.dismiss();
        if (modalTemplate == 0) {
            this.modal = this.modalCtrl.create('Syslog', { 'device': this.device });
        }
        else if (modalTemplate == 1) {
            this.modal = this.modalCtrl.create('Ipsec', data);
        }
        else if (modalTemplate == 2) {
            this.modal = this.modalCtrl.create('Vlan', data);
        }
        else {
            this.modal = this.modalCtrl.create('MoreServices', data);
        }

        this.modal.present();
    }
}
