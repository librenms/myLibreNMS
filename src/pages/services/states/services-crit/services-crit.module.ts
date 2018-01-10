import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesCritPage } from './services-crit';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        ServicesCritPage,
    ],
    imports: [
        IonicPageModule.forChild(ServicesCritPage), TranslateModule
    ],
})
export class ServicesCritPageModule { }
