import { Component, Input } from '@angular/core';
import {
  SebmGoogleMap,
  SebmGoogleMapPolyline,
  SebmGoogleMapPolylinePoint
} from 'angular2-google-maps/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss']
})

export class GmapsComponent {
  @Input() dbTracks: FirebaseListObservable<any[]>;
  @Input() dbUser: FirebaseObjectObservable<any>;

  constructor() {}
}
