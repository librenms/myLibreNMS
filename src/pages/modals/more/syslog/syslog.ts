import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { LibreNMS } from '../../../../providers/libre-nms';
import { LogProvider } from '../../../../providers/device/log-provider';
@IonicPage()
@Component({
    templateUrl: 'syslog.html'
})
export class Syslog {

    data: any;
    log: any = [];
    start: number = 0;
    limit: number = 20;
    total: number;
    log_name: any = 'eventlog';
    end_of_logs: boolean = false;

    constructor(
        public viewCtrl: ViewController,
        params: NavParams,
        private api: LibreNMS,
        private logs: LogProvider
    ) {
        this.data = params.data.device;
        this._get_initial_data();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    doInfinite(infiniteScroll) {
        if (this.end_of_logs) {
            infiniteScroll.complete();
            return;
        }

        this.logs.get(this.data.hostname, this.log_name, this.limit, this.total)
            .then((results) => {
                let temp_results = [];
                if (this.total === 0) {
                    this.end_of_logs = true;
                }

                if ((this.total - this.limit) < 0) {
                    this.total = 0;
                }
                else {
                    this.total -= this.limit;
                }

                results.forEach(result => temp_results.unshift(result));
                temp_results.forEach(result => this.log.push(result));
                infiniteScroll.complete();
            });

    }

    tab_change() {
        this.log = [];
        this._get_initial_data();
        this.end_of_logs = false;
    }

    _get_initial_data() {
        this.logs.count(this.data.hostname, this.log_name)
            .then((total) => {
                this.total = total;
                this.total -= this.limit;

                this.logs.get(this.data.hostname, this.log_name, this.limit, this.total)
                    .then((results) => {
                        this.total -= this.limit;
                        results.forEach(result => {
                            this.log.unshift(result);
                        })
                    });
            })

    }

    hasMessage(item) {
        if (item.msg == '') {
            return false;
        }
        else {
            return true;
        }
    }

    getIcon(string = '') {
        switch (string.toLowerCase()) {
            case 'up':
                return 'arrow-up';
            case 'down':
                return 'arrow-down';
            case 'alert':
                return 'alert';
            case 'sensor':
                return 'pulse';
            default:
                return 'information';
        }
    }
}
