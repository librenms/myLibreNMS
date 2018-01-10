import { Component } from '@angular/core';

import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { LibreNMS } from '../../../providers/libre-nms';
import { Rule } from '../../../model/rule';
@IonicPage()
@Component({
    templateUrl: 'rule.html'
})
export class RuleModal {
    rule: any;
    item: Rule;
    constructor(
        public viewCtrl: ViewController,
        params: NavParams,
        public api: LibreNMS
    ) {
        this.rule = params.data;
        this.api.getRule(this.rule.rule_id).then((data: Rule) => {
            this.item = data;
        });
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

}
