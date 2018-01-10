import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostGraph } from './host-graph';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
    declarations: [
        HostGraph,
    ],
    imports: [
        IonicPageModule.forChild(HostGraph), ComponentsModule
    ],
})
export class HostGraphModule { }
