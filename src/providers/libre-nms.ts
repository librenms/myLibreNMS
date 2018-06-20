import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Rule } from '../model/rule';
import { Platform } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';

@Injectable()
export class LibreNMS {
    api: string;
    url: string;
    token: string;
    libre_url: string;
    api_version: string = '/api/v0';
    constructor(public http: HttpClient, private storage: Storage, private platform: Platform, private nativeHttp: HTTP) {
        this.platform.ready().then(() => {
            this.nativeHttp.acceptAllCerts(true);
        })
     }

    /**
     * Authenticate Application
     * @param url URL to attempt authentication
     * @param token API Token
     * @return Observable Object
     */
    authenticate(url: string, token: string, basic: any = {enabled: false}): Observable<any> {
        return Observable.create((observer) => {
            this.platform.ready().then(() => {
                if (basic.enabled) this.nativeHttp.useBasicAuth(basic.username, basic.password);

                this.http.get(`${url}${this.api_version}`, { headers: this.headers(token) }).subscribe((response: any) => {
                    if (response.status == "error") {
                        observer.error(JSON.stringify(response));
                    }
                    else {
                        observer.next({ 'success': true });
                    }
                }, (error) => {
                    observer.error(JSON.stringify(error));
                }, () => {
                    observer.complete();
                })
            })
        });
    }

    /**
     * Unset application vars
     */
    logout(): boolean {
        this.storage.set('_session', { 'url': null, 'token': null });
        this.nativeHttp.useBasicAuth('','');
        return true;
    }

    /**
     * Get application connected status
     */
    connected(): boolean {
        return (this.url ? true : false);
    }

    get_credentials() {
        return new Promise((resolve, reject) => {
            this.storage.get('_session').then(session => resolve(session));
        })
    }

    get_device_groups() {
        return this.getRequest('/devicegroups');
    }

    get_group_devices(name) {
        return this.getRequest('/devicegroups/' + encodeURI(name));
    }

    /**
     * Get individual bill info
     * @param id Device ID
     */
    getRule(id: number) {
        return new Promise((resolve, reject) => {
            this.getRequest(`/rules/${id}`).subscribe(
                (response) => {
                    resolve(new Rule(response.rules[0]));
                });
        });
    }

    list_bgp(id: number) {
        return this.getRequest('/bgp?hostname=' + id);
    }

    list_ipsec(id: number) {
        return this.getRequest('/routing/ipsec/data/' + id);
    }

    list_vlan(id: number) {
        return this.getRequest('/devices/' + id + '/vlans');
    }

    list_services(state) {
        return this.getRequest('/services?state=' + state);
    }

    all_services() {
        return this.getRequest('/services');
    }

    get_host_services(id: number) {
        return this.getRequest('/services/' + id);
    }

    /**
     * Helper method to send get request
     * @param hook URL to send get request to
     */
    getRequest(hook: string, headers: Array<object> = [], contentType: string = 'application/json') {
        return Observable.create(observer => {
            this.storage.get('_session').then((session) => {
                this.http.get(`${session.url}${session.version}${hook}`, {headers: this.headers(session.token, headers, contentType) })
                    .subscribe(
                    data => observer.next(data),
                    err => console.error(err),
                    () => observer.complete()
                    )
            })
        })
    }

    /**
     * Helper method to send put request
     * @param hook URL to send get request to
     */
    putRequest(hook: string) {
        return Observable.create(observer => {
            this.storage.get('_session').then((session) => {
                this.http.put(`${session.url}${session.version}${hook}`, null, {headers: this.headers(session.token) })
                    .subscribe(
                    data => observer.next(data),
                    err => console.error(err),
                    () => observer.complete()
                    )
            })
        })
    }

    /**
     * Helper method to send post request
     * @param hook string URL to send get request to
     * @param data JSON object
     */
    postRequest(hook: string, data) {
        return Observable.create(observer => {
            this.storage.get('_session').then((session) => {
                this.http.post(`${session.url}${session.version}${hook}`, data, {headers: this.headers(session.token) })
                    .subscribe(
                    data => observer.next(data),
                    err => observer.error(err),
                    () => observer.complete()
                    )
            })
        })
    }


    /**
     * Build the headers for api request
     * @param token API Token to set in headers
     */
    private headers(token, additionalHeaders: Array<object> = [], contentType:string = 'application/json') {
        let headers = {};

        additionalHeaders.forEach((item) => {
            for (let i in item) {
                headers[i] = item[i];
            }
        })
        headers['Content-Type'] = contentType;
        headers['X-Auth-Token'] = token;
        return headers;
    }
}
