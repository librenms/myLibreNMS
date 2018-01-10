import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Vlan } from './vlan';

@NgModule({
    declarations: [
        Vlan,
    ],
    imports: [
        IonicPageModule.forChild(Vlan),
    ],
})
export class VlanModule { }
