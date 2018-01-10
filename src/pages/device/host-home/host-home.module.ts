import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostHome } from './host-home';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
    declarations: [
        HostHome,
    ],
    imports: [
        IonicPageModule.forChild(HostHome), TranslateModule, ComponentsModule
    ],
})
export class HostHomeModule { }
