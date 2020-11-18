import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfilUserComponent } from './Pages/profil-user/profil-user.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DetailsMatchComponent } from './Pages/details-match/details-match.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './Pages/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsMatchComponent
    HeaderComponent
    ProfilUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
