import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class CustomValidation {
    constructor(private storage: Storage) { }

    nameExists(control: AbstractControl) {
        return new Promise((resolve) => {
            this.storage.get('servers').then((servers) => {
                servers.forEach(server => {
                    if (server.name == control.value) {
                        resolve({ 'nameTaken': true })
                    };
                })
                resolve(null);
            });
        });
    }
}
