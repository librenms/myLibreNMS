import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesWarningPage } from './services-warning';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        ServicesWarningPage,
    ],
    imports: [
        IonicPageModule.forChild(ServicesWarningPage), TranslateModule
    ],
})
export class ServicesWarningPageModule { }
