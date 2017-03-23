import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { GmapsComponent } from './gmaps/gmaps.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dbTracks: FirebaseListObservable<any[]>;
  dbUser: FirebaseObjectObservable<any[]>;
  trackingId: number;
  trackingStartTime: number;
  trackedPoints: Point[];
  actualTrack: Track;
  trackKey: string;
  Math: any;
  navigator: any;
  userId = 'user1';
  defaultZoom = 17;

  constructor(af: AngularFire) {
    this.dbTracks = af.database.list('/tracks');
    this.dbUser = af.database.object(`/users/${this.userId}`);
    this.Math = Math;
    this.navigator = navigator;

    this.dbUser.update({
      isTracking: false,
    });
  }

  startTracking() {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
    }

    this.trackingStartTime = Date.now();
    this.trackedPoints = [];
    this.actualTrack = {
      created_at: this.trackingStartTime,
      trackColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // random hex color
      points: [],
      users: []
    };

    const onSuccess = (position) => {
      const actualLat = position.coords.latitude;
      const actualLng = position.coords.longitude;
      // conversion m/s to km/h + parse sample: 12.5
      const actualSpeed = parseFloat((position.coords.speed  * 3.6).toFixed(1));
      const actualAlt = position.coords.altitude || 0;

      this.dbUser.update({
        alt: actualAlt,
        isTracking: true,
        mapCenterLat: actualLat,
        mapCenterLng: actualLng,
        mapZoom: this.defaultZoom,
        speed: actualSpeed,
        eventStarted: this.trackingStartTime,
      });

      const point: Point = {
        lat: actualLat,
        lng: actualLng,
      };

      this.actualTrack.points.push(point);

      this.dbTracks.update(this.trackingStartTime.toString(), this.actualTrack);
    };

    const onError = () =>
      alert('Sorry, no position available. Click "Stop tracking" if You want to abort');

    const geoOptions = {
      enableHighAccuracy: true, // use GPS receiver, if possible
      maximumAge        : 30000,
      timeout           : 20000 // after fimeout exipires, onError will be invoked
    };

    this.trackingId = navigator.geolocation.watchPosition(onSuccess, onError, geoOptions);
  }

  stopTracking() {
    navigator.geolocation.clearWatch(this.trackingId);
    this.dbUser.update({
      alt: 0,
      isTracking: false,
      speed: 0,
    });
  }

  resetEvent() {
    this.stopTracking();
    this.dbTracks.remove();
  }

  calculateTimeElapsed(){
    return (Date.now() - this.trackingStartTime) / 1000;
  }
}

interface Point {
  lat: number;
  lng: number;
}

interface Track {
  created_at: number;
  trackColor: string;
  points: Point[];
  users: any[];
}
