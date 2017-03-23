import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  isPanelClosed = true;

  constructor() { }

  togglePanel() {
    this.isPanelClosed = !this.isPanelClosed;
  }

  onResize(event) {
    // this resize event update will refresh google maps
    // after side panel toggle (causing blank fields under the panel)
    event.target.innerWidth;
  }
}
