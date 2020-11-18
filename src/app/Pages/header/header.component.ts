import { Component, OnInit } from '@angular/core';
import {RiotApiService} from '../../Services/riot-api.service';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  stateProfil;
  constructor(private riotApiService: RiotApiService,
              public authenticationService: AuthService,
              private router: Router
  ) {

  }

  ngOnInit(): void {
    this.riotApiService.getSummonerByName().subscribe(summoner => {
      console.log(summoner);
    })
    if (this.authenticationService.currentUserValue) {
      this.stateProfil = true;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/')
    this.stateProfil = false;

  }


  connection() {
    this.router.navigateByUrl('/sign-in')
    this.stateProfil = true;

  }

  ngAfterViewInit() {
    if (this.authenticationService.currentUserValue) {
      this.stateProfil = true;
    }
  }
}
