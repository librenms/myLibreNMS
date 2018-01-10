import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertsPage } from './alerts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        AlertsPage,
    ],
    imports: [
        IonicPageModule.forChild(AlertsPage), TranslateModule
    ],
})
export class AlertsPageModule { }
