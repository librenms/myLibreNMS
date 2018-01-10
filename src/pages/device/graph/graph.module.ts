import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Graph } from './graph';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
@NgModule({
    declarations: [
        Graph,
    ],
    imports: [
        IonicPageModule.forChild(Graph), TranslateModule, ComponentsModule

    ],
})
export class GraphModule { }
