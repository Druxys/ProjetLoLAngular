import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfilUserComponent } from './Pages/profil-user/profil-user.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SignInComponent } from './Pages/sign-in/sign-in.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { DetailsMatchComponent } from './Pages/details-match/details-match.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './Pages/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    DetailsMatchComponent,
    HeaderComponent,
    ProfilUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
