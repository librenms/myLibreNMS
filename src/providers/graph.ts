import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LibreNMS } from './libre-nms';
import { Observable } from "rxjs/Observable";
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class GraphHelper {
    width: any = window.innerWidth;
    height: any = '200';
    total_graphs: number = 4;
    current: number = 0;
    constructor(private api: LibreNMS, public sanitizer: DomSanitizer) { }

    get(hook: string, from: string = 'end-24h', to: string = 'now', width: number = window.innerHeight, height: number = 200) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            this.api.get_credentials().then((credentials: any) => {
                req.open('GET', `${credentials.url}${credentials.version}/${hook}?from=${from}&to=${to}&width=${width}&height=${height}`);
                req.setRequestHeader('X-Auth-Token', credentials.token);
                req.responseType = "arraybuffer";
                req.onreadystatechange = () => {
                    if (req.readyState == 4 && req.status == 200) {
                        resolve(this.clean_response(req.response, req));
                    }
                };
                req.send();
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
            { "timeframe": "day_graph", "query": "-24h" },
            { "timeframe": "week_graph", "query": "-1w" },
            { "timeframe": "month_graph", "query": "-1m" },
            { "timeframe": "year_graph", "query": "-1y" }
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
    clean_response(data, request) {
        let content_type = request.getResponseHeader('Content-Type');
        let blob = null;
        if (content_type == 'image/png') {
            blob = new Blob([data]);
        }
        else {
            blob = new Blob([data], { type: "image/svg+xml" });
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
    }

    private increment(observer) {
        this.current++;
        if (this.current >= this.total_graphs) return observer.complete();
    }
}
