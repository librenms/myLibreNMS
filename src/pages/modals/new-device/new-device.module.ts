import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewDevice } from './new-device';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        NewDevice,
    ],
    imports: [
        IonicPageModule.forChild(NewDevice), TranslateModule
    ],
})
export class NewDeviceModule { }
