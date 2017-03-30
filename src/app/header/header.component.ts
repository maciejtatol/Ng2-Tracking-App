import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(public authService: AuthService, private router:Router) { }

  logout() {
    this.authService.logout()
    .then((data) => {
      this.router.navigate(['login']);
    })
    .catch(err => alert(err.message));
  }
}
