import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Alert } from '../model/alert';
import { LibreNMS } from './libre-nms';

@Injectable()
export class GlobalAlertProvider {
    private hook: string = '/alerts';
    constructor(private api: LibreNMS) { }

    /**
     * Get individual bill info
     * @param id Device ID
     */
    get(state: any) {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`${this.hook}?state=${state}`).subscribe(
                (response) => {
                    let alerts = [];
                    response.alerts.forEach(alert => {
                        alerts.push(new Alert(alert));
                    })
                    resolve(alerts);
                });
        });
    }

    /**
     * Acknowledge an alert
     * @param id ID of alert to acknowledge
     */
    ackowledge(id: number) {
        return new Promise((resolve, reject) => {
            this.api.putRequest(`${this.hook}/${id}`).subscribe((response) => {
                resolve(true);
            })
        })
    }

    /**
     * Unmute an alert
     * @param id ID of alert to unmute
     */
    unmute(id: number) {
        return new Promise((resolve, reject) => {
            this.api.putRequest(`${this.hook}/unmute/${id}`).subscribe((response) => {
                resolve(true);
            })
        })
    }
}

