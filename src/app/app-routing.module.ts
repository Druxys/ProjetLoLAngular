import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfilUserComponent} from './Pages/profil-user/profil-user.component';
import {HomeComponent} from './Pages/home/home.component';
import {DetailsMatchComponent} from './Pages/details-match/details-match.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfilUserComponent },
  { path: 'match', component: DetailsMatchComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]

})
export class AppRoutingModule { }
