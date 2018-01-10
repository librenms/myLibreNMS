import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Host } from './host';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Host,
    ],
    imports: [
        IonicPageModule.forChild(Host), TranslateModule
    ],
})
export class HostModule { }
