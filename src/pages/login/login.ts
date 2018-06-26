import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, MenuController, ToastController, Platform } from 'ionic-angular';
import { LibreNMS } from '../../providers/libre-nms';
import { Storage } from '@ionic/storage';
@IonicPage({
    priority: 'high'
})
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})

export class Login {
    public items: Array<{ token: string, url: string, name: any, basic: any }> = [];
    modal: any;
    keys: any;
    temp_item: any;
    constructor(
        private platform: Platform,
        private toastCtrl: ToastController,
        private navCtrl: NavController,
        private modalCtrl: ModalController,
        private menu: MenuController,
        private storage: Storage,
        private api: LibreNMS) {
        // this.menu.swipeEnable(false);
        this.refresh();
        this.menu.enable(false);
    }

    refresh() {
        this.items = [];
        this.storage.ready().then(() => {
            this.storage.get('servers').then((servers) => {
                servers.forEach(server => {
                    this.items.push({
                        token: server.token,
                        url: server.url,
                        name: server.name,
                        basic: server.basic
                    });
                })
            })
        });
    }

    openModal(modalTemplate, data = null) {
        if (modalTemplate == 0) {
            this.modal = this.modalCtrl.create('new-server');
        }
        else {
            this.modal = this.modalCtrl.create('Edit', data);
        }

        this.modal.onDidDismiss(data => {
            this.refresh();
        });
        this.modal.present();
    }

    login(item) {
        this.api.authenticate(item.url, item.token, item.basic).subscribe((data) => {
                this.menu.enable(true);
                this.storage.set('_session', { 'url': item.url, 'token': item.token, 'version': '/api/v0', 'basic': item.basic });
                this.navCtrl.setRoot('Dashboard');
        }, (error) => {
            error = JSON.parse(error);
            this.presentToast((error.status ? error.status : '') + ':' + (error.message ? error.message : ''));
        });
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
}
