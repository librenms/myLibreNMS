import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverMenu } from './popover-menu';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        PopoverMenu
    ],
    imports: [
        IonicPageModule.forChild(PopoverMenu), TranslateModule
    ],
})
export class PopoverMenuModule { }
