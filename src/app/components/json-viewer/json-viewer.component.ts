import { Component, Input, SimpleChanges } from '@angular/core';

import {HighlightLoader} from 'ngx-highlightjs';

@Component({
  selector: 'app-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.css']
})
export class JsonViewerComponent {
  @Input() code: any;
  

  constructor(private highlightLoader: HighlightLoader) { }

  ngOnChanges(changes: SimpleChanges) {}

  
}
