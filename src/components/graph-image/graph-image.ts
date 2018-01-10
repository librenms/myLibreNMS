import { Component, Input } from '@angular/core';

@Component({
  selector: 'graph-image',
  templateUrl: 'graph-image.html'
})
export class GraphImageComponent {
  @Input() image: any;
  @Input() loading: boolean;
  @Input() label: string;
  constructor() { }

}
