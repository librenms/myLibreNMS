import { Injectable } from '@angular/core';
import { Device } from '../../model/device';
import { LibreNMS } from '../libre-nms';

@Injectable()
export class DeviceProvider {
    constructor(private api: LibreNMS) { }

    /**
    * Get All Devices
    *
    * @return Observable
    **/
    all(): Promise<Device[]> {
        return new Promise((resolve, reject) => {
            this.api.getRequest(this.url()).subscribe((response) => {
                let devices: Device[] = [];
                response.devices.forEach(device => {
                    devices.push(new Device(device));
                })
                resolve(devices);
            })
        });
    }

    /**
     * Get Device from libreNMS
     * @param id 
     * @return Observable
     */
    get(id: number): Promise<Device> {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`${this.url(id)}`).subscribe((response) => {
                resolve(new Device(response.devices[0]));
            })
        });
    }

    /**
     * Send request to add new device
     * @param data JSON Object to post
     */
    add(data: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            this.api.postRequest(`${this.url()}`, data).subscribe(
                (response) => {
                    resolve({ 'success': true });
                },
                (error) => {
                    reject(error);
                });
        });
    }


    /**
     * Get Available graphs for a device by ID
     * @param id device_id
     */
    graphs(id: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`${this.url(id)}/graphs`).subscribe((response) => {
                resolve(response.graphs);
            })
        })
    }


    /**
     * Generate url method
     * @param id ID of device
     */
    private url(id: number = null): string {
        if (!id) return `/devices`;
        return `/devices/${id}`;
    }
}
