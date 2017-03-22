import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import { GmapsComponent } from './gmaps/gmaps.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any[]>;
  title = 'app works!';

  constructor(af: AngularFire) {
    this.items = af.database.list('/users');
    console.log(this.items);
  }

  logProps(item) {
    console.log(item);
  }
}
