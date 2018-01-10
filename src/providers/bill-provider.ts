import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Bill } from '../model/bill';
import { LibreNMS } from './libre-nms';

@Injectable()
export class GlobalBillProvider {
    private hook: string = '/bills';
    constructor(private api: LibreNMS) { }

    /**
     * Get a list of all bills
     * @param id Device ID
     */
    all(): Promise<Bill[]> {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`${this.hook}`).subscribe(
                (response) => {
                    let bills = [];
                    response.bills.forEach(bill => {
                        bills.push(new Bill(bill))
                    })
                    resolve(bills);
                });
        });
    }


    /**
     * Get individual bill info
     * @param id Device ID
     */
    get(id: number) {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`${this.hook}/${id}`).subscribe(
                (response) => {
                    resolve(new Bill(response.bill));
                });
        });
    }
}

