import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [
        Login,
    ],
    imports: [
        IonicPageModule.forChild(Login), TranslateModule
    ],
})
export class LoginModule { }
