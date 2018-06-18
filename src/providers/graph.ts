import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LibreNMS } from './libre-nms';
import { Observable } from "rxjs/Observable";
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from 'ionic-angular';
@Injectable()
export class GraphHelper {
    width: any = window.innerWidth;
    height: any = '200';
    total_graphs: number = 4;
    current: number = 0;
    constructor(private api: LibreNMS, public sanitizer: DomSanitizer, private toastCtrl: ToastController) { }

    get(hook: string, from: string = 'end-24h', to: string = 'now', width: number = window.innerHeight, height: number = 200) {
        return new Promise((resolve, reject) => {
            this.api.getRequest(`/${hook}?from=${from}&to=${to}&width=${width}&height=${height}&output=base64`).subscribe((response: any) => {
                console.log(response);
                if (response == null) {
                    reject("Your librenms install did not return any data, please make sure it is up to date");
                }
                resolve(this.clean_response(response.image.image, response.image['content-type']));
            })
        });
    }

    /**
     * Load all timeseries of graphs
     * @param url URL endpoint to load graphs
     */
    series(hook: string, from: string = 'end-24h', to: string = 'now', width: number = window.innerHeight, height: number = 200) {
        this.current = 0;
        const graph_times = [
            { "timeframe": "day_graph", "query": "end-24h" },
            { "timeframe": "week_graph", "query": "end-1w" },
            { "timeframe": "month_graph", "query": "end-1m" },
            { "timeframe": "year_graph", "query": "end-1y" }
        ];
        return Observable.create(observer => {
            graph_times.forEach((timeframe) => {
                this.get(hook, timeframe.query).then(day => {
                    observer.next({ "timeframe": timeframe.timeframe, "url": day });
                    this.increment(observer);
                })
            })
        });
    }

    /**
     * Clean the response and convert to image
     * @param response 
     */
    clean_response(data, content_type) {
        let blob = new Blob([this.base64ToArrayBuffer(data)], { type: content_type});
        return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    }

    private increment(observer) {
        this.current++;
        if (this.current >= this.total_graphs) return observer.complete();
    }

    /**
     * https://stackoverflow.com/questions/21797299/convert-base64-string-to-arraybuffer
     * @param base64 
     */
    private base64ToArrayBuffer(base64) {
        var binary_string =  window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array( len );
        for (var i = 0; i < len; i++)        {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }
}
