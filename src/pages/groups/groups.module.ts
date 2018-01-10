import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Groups } from './groups';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Groups,
    ],
    imports: [
        IonicPageModule.forChild(Groups), TranslateModule
    ],
})
export class GroupsModule { }
