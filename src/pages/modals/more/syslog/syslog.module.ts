import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Syslog } from './syslog';

@NgModule({
    declarations: [
        Syslog,
    ],
    imports: [
        IonicPageModule.forChild(Syslog),
    ],
})
export class SyslogModule { }
