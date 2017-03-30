import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private af: AngularFire) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.af.auth.map((auth) =>  {
        if(auth == null) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }).first()
    }
}
