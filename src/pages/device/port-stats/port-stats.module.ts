import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortStatsPage } from './port-stats';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [
        PortStatsPage,
    ],
    imports: [
        IonicPageModule.forChild(PortStatsPage), TranslateModule, ComponentsModule
    ],
})
export class PortStatsPageModule { }
