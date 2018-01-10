import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostWirelessPage } from './host-wireless';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
    declarations: [
        HostWirelessPage,
    ],
    imports: [
        IonicPageModule.forChild(HostWirelessPage), ComponentsModule
    ],
})
export class HostWirelessPageModule { }
