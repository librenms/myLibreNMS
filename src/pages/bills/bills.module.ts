import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillsPage } from './bills';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        BillsPage,
    ],
    imports: [
        IonicPageModule.forChild(BillsPage), TranslateModule
    ],
})
export class BillsPageModule { }
