import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostPortsPage } from './host-ports';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [
        HostPortsPage,
    ],
    imports: [
        IonicPageModule.forChild(HostPortsPage), ComponentsModule
    ],
})
export class HostPortsPageModule { }
