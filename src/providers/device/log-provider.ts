import { Injectable } from '@angular/core';
import { LibreNMS } from '../libre-nms';

@Injectable()
export class LogProvider {
    constructor(private api: LibreNMS) { }

    /**
     * Get Logs for Device
     * @param hostname 
     * @param type 
     * @param limit 
     * @param start 
     * @return Observable Array<>
     */
    get(hostname: string, type: string, limit: number = 20, start: number = 0): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.api.getRequest(this.url(hostname, type, limit, start)).subscribe((response) => {
                resolve(response.logs);
            })
        })
    }

    /**
     * Get total log count
     * @param hostname 
     * @param type 
     * @param limit 
     * @param start 
     * @return Observable Integer
     */
    count(hostname: string, type: string, limit: number = 5, start: number = 0): Promise<number> {
        return new Promise((resolve, reject) => {
            this.api.getRequest(this.url(hostname, type, limit, start)).subscribe((response) => {
                resolve(response.total);
            })
        })
    }

    /**
     * Generate the URL
     * @param hostname 
     * @param type
     * @param limit
     * @param start
     * @return STRING
     */
    private url(hostname: string, type: string, limit: number, start: number): string {
        return `/logs/${type}/${hostname}?limit=${limit}&start=${start}`;
    }

}
