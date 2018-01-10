import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { Device } from '../../model/device';
import { Wireless } from '../../model/wireless';
import { LibreNMS } from '../libre-nms';

@Injectable()
export class WirelessProvider {

  constructor(private api: LibreNMS) { }

  /**
  * Get all available ports for a device
  * @param id The ID of the device
  */
  get(id: number): Promise<Wireless[]> {
    return new Promise((resolve, reject) => {
      this.api.getRequest(`${this.device_hook(id)}`).subscribe((response) => {
        let wireless: Wireless[] = [];
        response.graphs.forEach(item => wireless.push(new Wireless(item)));
        resolve(wireless);
      }, (error) => {
        console.error(error);
      })
    });
  }

  /**
   * Count The response graphs
   * @param id 
   */
  exists(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.api.getRequest(`${this.device_hook(id)}`).subscribe((response) => {
        resolve(response.count > 0);
      }, (error) => {
        console.error(error);
      })
    })
  }

  private device_hook(id: number): string {
    return `/devices/${id}/wireless`;
  }

}
