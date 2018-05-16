import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Syslog } from './syslog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        Syslog,
    ],
    imports: [
        IonicPageModule.forChild(Syslog), TranslateModule
    ],
})
export class SyslogModule { }
