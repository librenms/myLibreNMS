import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ipsec } from './ipsec';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Ipsec,
    ],
    imports: [
        IonicPageModule.forChild(Ipsec),TranslateModule
    ],
})
export class IpsecModule { }
