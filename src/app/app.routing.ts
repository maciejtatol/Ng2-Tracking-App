import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { firebaseConfig } from './../environments/firebase.config';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { PointFilterPipe } from './point-filter.pipe';
import { HeaderComponent } from './header/header.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventComponent } from './event/event.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { AuthGuard } from './guards/index';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'event/create', component: EventCreateComponent, canActivate: [AuthGuard] },
  { path: 'event/:id', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: '**', redirectTo: '' } //otherwise redirect to home
];
export const routing = RouterModule.forRoot(routes);
