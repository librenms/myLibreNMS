import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Bill } from './bill';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        Bill,
    ],
    imports: [
        IonicPageModule.forChild(Bill), TranslateModule
    ],
})
export class BillModule { }
