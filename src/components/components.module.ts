import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { GraphImageComponent } from './graph-image/graph-image';
import { ThumbnailComponent } from './thumbnail/thumbnail';

@NgModule({
	declarations: [GraphImageComponent,
		ThumbnailComponent],
	imports: [IonicModule, IonicImageViewerModule],
	exports: [GraphImageComponent,
		ThumbnailComponent]
})
export class ComponentsModule { }
