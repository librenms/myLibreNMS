import { Component } from '@angular/core';

import { IonicPage, ViewController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CustomValidation } from '../../../../CustomValidators';
@IonicPage({
    name: 'new-server'
})
@Component({
    selector: 'new-server-model',
    templateUrl: 'new.html'
})
export class NewServer {
    newServer: any;
    data: any;
    my_token: string;
    constructor(
        public viewCtrl: ViewController,
        public fb: FormBuilder,
        private storage: Storage,
        private toastCtrl: ToastController,
        private barcode: BarcodeScanner,
        private validator: CustomValidation
    ) {

        this.newServer = this.fb.group({
            api: [this.my_token, Validators.required],
            url: ['', Validators.required],
            name: ['', Validators.required, validator.nameExists.bind(validator)],
            basic: this.fb.group({
                enabled: false,
                username: '',
                password: ''
            })
        });
    }
    save() {
        this.storage.get('servers').then((servers) => {
            servers.forEach(server => {
                if (server.name == this.newServer.value.name) {
                    this.presentToast('That name already exists, try another');
                    return;
                }
            })

            if (this.newServer.value.url.substring(this.newServer.value.url.length - 1) == "/") {
                this.newServer.value.url = this.newServer.value.url.substring(0, this.newServer.value.url.length - 1);
            }

            servers.push({ 
                'name': this.newServer.value.name.trim(), 
                'url': this.newServer.value.url.trim(), 
                'token': this.newServer.value.api.trim(),
                'basic': this.newServer.value.basic
            });

            this.storage.set('servers', servers);
            this.dismiss();
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }

    scan() {
        this.barcode.scan().then((barcodeData) => {
            this.presentToast(barcodeData.text);
            this.my_token = barcodeData.text;
        }, (err) => {
            this.presentToast(err);
        });
    }

    private validateName(control: AbstractControl) {
        this.storage.get('servers').then((servers) => {
            servers.forEach(server => {
                if (control.value == server.name) {
                    return { nameAvailable: true };
                }
            })
            return null;
        })
    }
}
