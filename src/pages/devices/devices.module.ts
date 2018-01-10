import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Devices } from './devices';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Devices,
    ],
    imports: [
        IonicPageModule.forChild(Devices), TranslateModule
    ],
})
export class DevicesModule { }
