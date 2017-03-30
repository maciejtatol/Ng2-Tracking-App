import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(public authService: AuthService, private router:Router) {


  }
  ngOnInit() {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth !== null) {
          this.router.navigate(['']);
        }
      }
    );
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
