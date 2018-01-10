import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewServer } from './new-server';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        NewServer,
    ],
    imports: [
        IonicPageModule.forChild(NewServer), TranslateModule
    ],
})
export class NewServerModule { }
