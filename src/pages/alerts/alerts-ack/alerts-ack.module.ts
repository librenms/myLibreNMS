import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertsAckPage } from './alerts-ack';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AlertsAckPage,
    ],
    imports: [
        IonicPageModule.forChild(AlertsAckPage), TranslateModule
    ],
})
export class AlertsAckPageModule { }
