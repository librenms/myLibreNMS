import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RuleModal } from './rule';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        RuleModal,
    ],
    imports: [
        IonicPageModule.forChild(RuleModal), TranslateModule
    ],
})
export class RuleModalModule { }
