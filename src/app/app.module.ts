import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import {
  AngularFireModule,
  AuthMethods,
  AuthProviders
} from 'angularfire2';

import { MapWrapperService } from './map-wrapper.service';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { GmapsComponent } from './gmaps/gmaps.component';
import { firebaseConfig } from './../environments/firebase.config';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { PointFilterPipe } from './point-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GmapsComponent,
    PointFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAdqECNlRtdg5MaB-GJQ486W-jGZhhWCNg'
    })
  ],
  providers: [MapWrapperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
