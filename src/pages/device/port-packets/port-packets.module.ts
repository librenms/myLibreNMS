import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortPacketsPage } from './port-packets';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        PortPacketsPage,
    ],
    imports: [
        IonicPageModule.forChild(PortPacketsPage), TranslateModule
    ],
})
export class PortPacketsPageModule { }
