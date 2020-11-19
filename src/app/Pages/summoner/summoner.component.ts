import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
   matchs: any;

  constructor(private router: Router,) { }

  ngOnInit(): void {
    console.log(this.router.getCurrentNavigation());
    if (!this.router.getCurrentNavigation().extras.state.history) {
      this.router.navigate(['/']);
    } else {
      this.matchs = this.router.getCurrentNavigation().extras.state.history;
      console.log(this.matchs);
    }
  }

}
