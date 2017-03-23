import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import { GmapsComponent } from './gmaps/gmaps.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
    this.items = af.database.list('/users');
  }

  logProps(item) {
    console.log(item);
  }
}
