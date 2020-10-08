import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { ProfilUserComponent } from './Pages/profil-user/profil-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilUserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
