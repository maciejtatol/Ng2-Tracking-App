import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  dbEvents: FirebaseListObservable<any[]>;
  myEvents: any[];
  uid: string;

  constructor(af: AngularFire, public authService: AuthService, public router: Router) {
    this.authService.af.auth.subscribe((auth) => {
      if (auth !== null) {
        this.uid = auth.uid;

        this.dbEvents = af.database.list('/events');
        this.dbEvents.subscribe(
          (allEvents) => {
            console.log(allEvents);
            this.myEvents = [];
            allEvents.forEach(thisEvent => {
              if (thisEvent.users && Object.keys(thisEvent.users).includes(auth.uid)) {
                this.myEvents.push(thisEvent);
              }
            })
          }
        )
      }
    });
  }

  isAuthor(eventAuthorId) {
    return eventAuthorId && eventAuthorId === this.uid;
  }

  createEvent() {
    this.router.navigate([`/event/create`]);
  }

  deleteEvent(id) {
    if (confirm("Are you sure?")) {
      this.dbEvents.remove(id);
    }
  }

  navigateToEvent(id) {
    this.router.navigate([`/event/${id}`]);
  }

  editEvent(id) {
    this.router.navigate([`/event/edit/${id}`]);
  }

  ngOnInit() {
  }

}

interface Event {
  created_at: Date;
  eventStarted: Date;
  event_name: string;
  mapDestinationLat: number;
  mapDestinationLng: number;
  users: any[];
}
