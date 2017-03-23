import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})

export class SidePanelComponent {
  isPanelClosed = true;
  @Input() dbUser: FirebaseObjectObservable<any>;

  @Output() startTracking: EventEmitter<any> = new EventEmitter();
  @Output() stopTracking: EventEmitter<any> = new EventEmitter();

  constructor() { }

  togglePanel() {
    this.isPanelClosed = !this.isPanelClosed;
  }

  onStartTracking() {
    this.startTracking.emit();
  }

  onStopTracking() {
    this.stopTracking.emit();
  }

  onResize(event) {
    // this resize event update will refresh google maps
    // after side panel toggle (causing blank fields under the panel)
    return event.target.innerWidth;
  }
}
