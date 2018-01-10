import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Group } from './group';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Group,
    ],
    imports: [
        IonicPageModule.forChild(Group), TranslateModule
    ],
})
export class GroupModule { }
