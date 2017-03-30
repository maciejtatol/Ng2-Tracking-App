import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../providers/auth.service';
import {
  SebmGoogleMap,
  SebmGoogleMapPolyline,
  SebmGoogleMapPolylinePoint
} from 'angular2-google-maps/core';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  dbEvents: FirebaseListObservable<any[]>;
  dbUsers: FirebaseListObservable<any[]>;
  createdAt: Date;
  newEvent: Event;
  uid: string;


  constructor(af: AngularFire, public authService: AuthService, public router: Router) {
    this.dbUsers = af.database.list(`/users`);
    this.authService.af.auth.subscribe((auth) => {
      if (auth !== null) {
        this.uid = auth.uid;
        this.dbEvents = af.database.list('/events');
      }
    });
  }

  onSubmit(form: any): void {
    let selectedUsers = {}; // users IDs will be passed as object keys with value "true"

    this.dbUsers.subscribe((users) => {
      users.map(user => selectedUsers[user.uid] = true); //adding users related to event
      this.createdAt = new Date;
      this.newEvent = {
        created_at: this.createdAt.toString(),
        created_by: this.uid,
        event_name: form.eventName,
        map_destination_lat: form.latitude || 0,
        map_destination_lng: form.longitude || 0,
        users: selectedUsers,
      }

      this.dbEvents.push(this.newEvent).then(()=> this.router.navigate(['']));
    });
  }

  ngOnInit() {
  }

}

interface Event {
  created_at: string;
  created_by: string;
  event_started?: Date;
  event_name: string;
  map_destination_lat: number;
  map_destination_lng: number;
  users: any;
}
