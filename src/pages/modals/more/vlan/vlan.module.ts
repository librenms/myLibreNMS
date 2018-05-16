import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Vlan } from './vlan';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Vlan,
    ],
    imports: [
        IonicPageModule.forChild(Vlan),TranslateModule
    ],
})
export class VlanModule { }
