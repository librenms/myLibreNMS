import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
    template: `
    <ion-item>
      <h4>State: <strong>{{state}}</strong></h4>
    </ion-item>
  `
})
export class StatusPopover {
    state: string = '';
    constructor(public viewCtrl: ViewController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.state = navParams.data.state;
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
