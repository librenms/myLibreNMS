import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ipsec } from './ipsec';

@NgModule({
    declarations: [
        Ipsec,
    ],
    imports: [
        IonicPageModule.forChild(Ipsec),
    ],
})
export class IpsecModule { }
