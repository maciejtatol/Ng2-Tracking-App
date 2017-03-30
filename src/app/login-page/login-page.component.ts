import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../providers/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  dbUsers: FirebaseListObservable<any[]>;
  userAccountExist = false;
  userAccount: User;

  constructor(af: AngularFire, public authService: AuthService, private router:Router) {
    this.dbUsers = af.database.list(`/users`);
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth !== null) {
          this.dbUsers.subscribe((users) => {
            // check if user exist in db /users
            users.map((user) => {
              if(user.uid === auth.uid) {
                this.userAccountExist = true;
              }
            });

            // if not - add new one with auth uid key
            if(!this.userAccountExist){
              this.userAccount = {
                alt: 0,
                created_at: (new Date).toString(),
                eventStarted: '',
                full_name: auth.auth.displayName,
                isTracking: false,
                isVisitor: false,
                mapCenterLat: 0,
                mapCenterLng: 0,
                mapDestinationLat: 0,
                mapDestinationLng: 0,
                mapZoom: 17,
                uid: auth.uid
              }

              this.dbUsers.push(this.userAccount);
            }

            this.router.navigate(['']);
          });

        }
      }
    );
  }
  ngOnInit() {

  }
  loginWithGoogle() {
    this.authService.loginWithGoogle()
    .then((data) => {
      this.router.navigate(['']);
    })
    .catch(err => alert(err.message));
  }
  loginWithFacebook() {
    this.authService.loginWithFacebook()
    .then((data) => {
      this.router.navigate(['']);
    })
    .catch(err => alert(err.message));
  }
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
  uid: string;
}
