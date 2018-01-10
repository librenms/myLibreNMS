import { Injectable } from '@angular/core';
import { Port } from '../../model/port';
import { LibreNMS } from '../libre-nms';

@Injectable()
export class PortProvider {
    device_hook: string = '/devices/';
    constructor(private api: LibreNMS) { }

    /**
     * Get all available ports for a device
     * @param id The ID of the device
     */
    get(id: number): Promise<Port[]> {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`${this.device_hook}${id}/ports`).subscribe((response) => {
                let ports: Port[] = [];
                response.ports.forEach(port => ports.push(new Port(port)));
                resolve(ports);
            })
        });
    }

    /**
     * 
     * @param id The ID of the device
     * @param port Which port to get data from
     */
    get_device_port_stats(id: number, port: string) {
        return this.api.getRequest(`/devices/${id}/ports/${port}`);
    }
}
