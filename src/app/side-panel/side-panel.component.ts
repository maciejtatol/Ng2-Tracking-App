import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})

export class SidePanelComponent {
  isPanelClosed = true;
  @Input() dbUsers: FirebaseListObservable<any[]>;
  @Input() eventId: string;
  @Input() userId: string;
  @Input() eventAuthorId: string;

  @Output() startTracking: EventEmitter<any> = new EventEmitter();
  @Output() stopTracking: EventEmitter<any> = new EventEmitter();
  @Output() resetEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  togglePanel() {
    this.isPanelClosed = !this.isPanelClosed;
  }

  isActualUser(itemId) {
    return itemId && itemId === this.userId;
  }

  isEventAuthor(itemId) {
    return itemId &&
      itemId === this.eventAuthorId &&
      itemId === this.userId;
  }

  onStartTracking() {
    this.startTracking.emit();
  }

  onStopTracking() {
    this.stopTracking.emit();
  }

  onResetEvenet() {
    this.resetEvent.emit();
  }

  onResize(event) {
    // this resize event update will refresh google maps
    // after side panel toggle (causing blank fields under the panel)
    return event.target.innerWidth;
  }
}
