import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Device } from '../../model/device';
import { LibreNMS } from '../libre-nms';

@Injectable()
export class SensorProvider {
    private device_hook: string = '/devices';
    constructor(private api: LibreNMS) { }

    /**
     * Get a list of all sensors for device
     * @param id Device ID
     */
    all(id: number) {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`${this.device_hook}/${id}/health`).subscribe(
                (response) => {
                    resolve(response.graphs);
                });
        });
    }


    /**
     * Get individual sensor info
     * @param id Device ID
     * @param sensor Sensor name
     */
    get(id: number, sensor: string) {
        return Observable.create(observer => {
            this.api.getRequest(`${this.device_hook}/${id}/health/${sensor}`).subscribe(
                (response) => {

                },
                (error) => {

                },
                () => {
                    observer.complete();
                });
        });
    }

    /**
     * Get graph for sensor
     * @param id Device ID
     * @param sensor Sensor Name
     * @param sensor_id Sensor ID
     */
    sensor_graph(id: number, sensor: string, sensor_id: number) {
        return Observable.create(observer => {
            this.api.getRequest(`${this.device_hook}/${id}/health/${sensor}/${sensor_id}`).subscribe(
                (response) => {

                },
                (error) => {

                },
                () => {
                    observer.complete();
                });
        });
    }
}
