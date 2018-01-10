import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesModal } from './services-modal';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        ServicesModal,
    ],
    imports: [
        IonicPageModule.forChild(ServicesModal), TranslateModule
    ],
})
export class ServicesModalModule { }
