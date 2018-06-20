import { Component } from '@angular/core';

import { IonicPage, ViewController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    templateUrl: 'edit.html'
})
export class Edit {
    api: AbstractControl;
    url: AbstractControl;
    name: any;
    newServer: any;
    constructor(
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        private fb: FormBuilder,
        private params: NavParams,
        public storage: Storage
    ) {
        this.name = params.data.name;
        this.newServer = this.fb.group({
            name: [{ value: params.data.name, disabled: true }, Validators.required],
            token: [{ value: params.data.token, disabled: false }, Validators.required],
            url: [{ value: params.data.url, disabled: false }, Validators.required],
            basic: this.fb.group({
                enabled:  (params.data.basic != undefined ? params.data.basic.enabled : false),
                username: (params.data.basic != undefined ? params.data.basic.username : ''),
                password: (params.data.basic != undefined ? params.data.basic.password : ''),
            })
        });        
    }

    save() {
        this.storage.get('servers').then((servers) => {
            servers.forEach((server, index) => {
                if (server.name == this.newServer.controls.name.value) {
                    servers[index].url = this.newServer.controls.url.value;
                    servers[index].token = this.newServer.controls.token.value;
                    servers[index].basic = this.newServer.controls.basic.value;
                    this.storage.set('servers', servers);
                }
            })
            this.dismiss();
        })
    }

    remove() {
        this.storage.get('servers').then((servers) => {
            servers.forEach((server, index) => {
                if (server.name == this.name) servers.splice(index, 1);
            })
            this.storage.set('servers', servers);
            this.dismiss();
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

}
