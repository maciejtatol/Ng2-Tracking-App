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
  @Input() eventTracks: Track;
  @Input() dbUser: FirebaseObjectObservable<any>;

  constructor() {}
}

interface Point {
  lat: number;
  lng: number;
}

interface Track {
  created_at: Date;
  trackColor: string;
  points: Point[];
  userId: string;
  eventId: string;
}
