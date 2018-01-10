import { Component, Input } from '@angular/core';

@Component({
  selector: 'thumbnail',
  templateUrl: 'thumbnail.html'
})
export class ThumbnailComponent {
  @Input() image: any;
  @Input() label: string;
  constructor() { }

}
