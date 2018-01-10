import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthPage } from './health';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
    declarations: [
        HealthPage,
    ],
    imports: [
        IonicPageModule.forChild(HealthPage), ComponentsModule
    ],
})
export class HealthPageModule { }
