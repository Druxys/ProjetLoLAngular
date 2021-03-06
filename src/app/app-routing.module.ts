import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Pages/header/header.component';
import {Routes, RouterModule} from '@angular/router';
import {ProfilUserComponent} from './Pages/profil-user/profil-user.component';
import {SignInComponent} from './Pages/sign-in/sign-in.component';
import {DetailsMatchComponent} from './Pages/details-match/details-match.component';
import {SignUpComponent} from './Pages/sign-up/sign-up.component';
import {SummonerComponent} from './Pages/summoner/summoner.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'match', component: DetailsMatchComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'profil', component: ProfilUserComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'summoner', component: SummonerComponent },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]

})
export class AppRoutingModule { }
