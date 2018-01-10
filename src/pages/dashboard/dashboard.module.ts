import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Dashboard,
    ],
    imports: [
        IonicPageModule.forChild(Dashboard), TranslateModule
    ],
})
export class DashboardModule { }
