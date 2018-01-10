import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertsLivePage } from './alerts-live';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AlertsLivePage,
    ],
    imports: [
        IonicPageModule.forChild(AlertsLivePage), TranslateModule
    ],
})
export class AlertsLivePageModule { }
