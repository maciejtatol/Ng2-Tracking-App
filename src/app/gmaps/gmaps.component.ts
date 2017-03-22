import { Component, OnInit } from '@angular/core';
import {
  SebmGoogleMap,
  SebmGoogleMapPolyline,
  SebmGoogleMapPolylinePoint
} from 'angular2-google-maps/core';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';
import { MapWrapperService } from './../map-wrapper.service';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent {
  dbTracks: FirebaseListObservable<any[]>;
  trackingId: number;
  trackingStartTime: Date;
  trackedPoints: point[];
  actualTrack: track;
  trackKey: string;
  Math: any;
  navigator: any;

  zoom = 8;
  lat = 51.673858;
  lng = 7.815982;

  constructor(af: AngularFire) {
    this.dbTracks = af.database.list('/tracks');
    this.Math = Math;
    this.navigator = navigator;
  }

  startTracking() {
    // navigator.geolocation.getCurrentPosition(function(location) {
    //   this.lat = location.coords.latitude;
    //   this.lng = location.coords.longitude;
    //
    //   console.log(location.coords.latitude);
    //   console.log(location.coords.longitude);
    //   console.log(location.coords.accuracy);
    // })
   if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
    }

    this.trackingStartTime = new Date();
    this.trackedPoints = [];
    this.actualTrack = {
      created_at: this.trackingStartTime,
      trackColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // random hex color
      points: [],
      users: []
    };

    this.dbTracks.push(this.actualTrack).then((snap) => {
      this.trackKey = snap.key;
    });

    const onSuccess = (position) => {
      console.log(position);
      const point: point = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.actualTrack.points.push(point);

      this.dbTracks.update(this.trackKey, this.actualTrack);
    };

    const onError = () => alert('Sorry, no position available. Click "Stop tracking" if You want to abort');

    const geoOptions = {
      enableHighAccuracy: true,
      maximumAge        : 30000,
      timeout           : 10000
    };

    this.trackingId = navigator.geolocation.watchPosition(onSuccess, onError, geoOptions);
    //
    // this.trackingIntervalId = setInterval(() => {
    //   const point: point = {
    //     lat: (this.Math.random(2) + 50),
    //     lng: (this.Math.random(2) + 7),
    //   }
    //   this.actualTrack.points.push(point);
    //
    //
    //   this.dbTracks.update(this.trackKey, this.actualTrack);
    // }, 1500)
  }

  stopTracking() {
    navigator.geolocation.clearWatch(this.trackingId);
  }
}

interface point {
  lat: number;
  lng: number;
}

interface track {
  created_at: Date;
  trackColor: string;
  points: point[];
  users: any[];
}
