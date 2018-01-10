import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreServices } from './more-services';

@NgModule({
    declarations: [
        MoreServices,
    ],
    imports: [
        IonicPageModule.forChild(MoreServices),
    ],
})
export class MoreServicesModule { }
