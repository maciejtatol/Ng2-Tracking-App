import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

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

import { AuthService } from './providers/index';
import { AuthGuard } from './guards/index';
import { routing } from './app.routing';
import { EventListComponent } from './event-list/event-list.component';
import { EventCreateComponent } from './event-create/event-create.component';

@NgModule({
  declarations: [
    AppComponent,
    GmapsComponent,
    HeaderComponent,
    PointFilterPipe,
    SidePanelComponent,
    LoginPageComponent,
    HomePageComponent,
    EventComponent,
    EventListComponent,
    EventCreateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdqECNlRtdg5MaB-GJQ486W-jGZhhWCNg'
    }),
    routing
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
