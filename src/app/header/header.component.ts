import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() dbUser: FirebaseObjectObservable<any>;
  @Output() resetEvent = new EventEmitter();

  constructor() { }

  onResetEvent() {
    this.resetEvent.emit();
  }
}
