import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesGoodPage } from './services-good';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        ServicesGoodPage,
    ],
    imports: [
        IonicPageModule.forChild(ServicesGoodPage), TranslateModule
    ],
})
export class ServicesGoodPageModule { }
