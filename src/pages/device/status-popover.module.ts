import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatusPopover } from './status-popover';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        StatusPopover
    ],
    imports: [
        IonicPageModule.forChild(StatusPopover), TranslateModule
    ],
})
export class StatusPopoverModule { }
