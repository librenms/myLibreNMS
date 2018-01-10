import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Edit } from './edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Edit,
    ],
    imports: [
        IonicPageModule.forChild(Edit), TranslateModule
    ],
})
export class EditModule { }
