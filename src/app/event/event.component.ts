import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../providers/auth.service';
import { GmapsComponent } from './../gmaps/gmaps.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  dbTracks: FirebaseListObservable<any[]>;
  eventTracks: Track[];
  dbUsers: FirebaseListObservable<any[]>;
  dbEvent: FirebaseObjectObservable<any[]>;
  dbUser: FirebaseObjectObservable<any[]>;
  trackingId: number;
  trackingStartTime: Date;
  trackedPoints: Point[];
  actualTrack: Track;
  trackKey: string;
  Math: any;
  navigator: any;
  userId: string;

  eventKey: string;
  defaultZoom = 17;

  private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;

  constructor(af: AngularFire, public authService: AuthService, private router: Router, public route: ActivatedRoute) {
    this.dbTracks = af.database.list('/tracks');
    this.dbUsers = af.database.list(`/users`);

    this.Math = Math;
    this.navigator = navigator;

    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth !== null) {
          this.dbUsers.subscribe((users) => {
            users.map((user) => {
              if(user.uid === auth.uid && this.userId !== auth.uid) {
                this.userId = auth.uid;
                this.dbUser = af.database.object(`/users/${user.$key}`);
                this.dbUser.update({
                  isTracking: false,
                });
              }
            })
          });
        }
      }
    );

    this.route.params.subscribe(params => {
      this.eventKey = params['id'];
      this.dbEvent = af.database.object(`/events/${this.eventKey}`);

      // reload eventTracks related to actual event by eventId
      this.dbTracks.subscribe((tracks) => {
        this.eventTracks = [];
        tracks.map((track) => {
          if(track.eventId === this.eventKey){
            this.eventTracks.push(track);
          }
        })
      });
    });
   }

  ngOnInit() {

  }

  startTracking() {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
    }

    this.trackingStartTime = new Date;
    this.trackedPoints = [];
    this.actualTrack = {
      created_at: this.trackingStartTime,
      trackColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // random hex color
      points: [],
      userId: this.userId,
      eventId: this.eventKey,
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

interface User {
  alt: number;
  created_at: string;
  eventStarted: string;
  full_name: string;
  isTracking: boolean;
  isVisitor: boolean;
  mapCenterLat: number;
  mapCenterLng: number;
  mapDestinationLat: number;
  mapDestinationLng: number;
  mapZoom: number;
}
