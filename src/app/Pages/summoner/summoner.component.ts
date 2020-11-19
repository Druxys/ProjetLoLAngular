import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HistoryService} from '../../Services/history.service';
import {first} from 'rxjs/operators';
import {ChampionService} from '../../Services/champion.service';
import {element} from 'protractor';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {
  matches: any;
  matchesArray = [];
  matchesDetails = [];
  championArray = [];
  champion;
  user: any;

  constructor(private router: Router,
              private historyService: HistoryService,
              private championService: ChampionService
  ) {

    console.log(this.router.getCurrentNavigation());
    if (!this.router.getCurrentNavigation()) {
      this.router.navigate(['/home']);
    } else {
      this.matches = this.router.getCurrentNavigation().extras.state.history;
      this.user = this.router.getCurrentNavigation().extras.state.user;
      console.log(this.matches.matches);
    }


  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.matchesArray.push(this.matches.matches[i]);
      console.log(this.matches.matches[i]);
    }
    console.log(this.matchesArray);

    this.matchesArray.forEach(match => {
      // console.log(match)
      this.historyService.getHistoryByIdMatch(match.gameId).pipe(first())
        .subscribe({
          next: (history) => {
            this.matchesDetails.push(history);
          },
          error: error => {
            console.log(error);
          }
        });
    });
    console.log(this.matchesDetails);
    this.championService.getChampionAll().pipe(first())
      .subscribe({
        next: (champion) => {
          console.log(champion);
          var obj = Object.values(this.champion);
          // console.log(this.championArray);
          this.championArray.push(obj)
        },
        error: error => {
          console.log(error);
        }

      });
    console.log(this.championArray);
    console.log(this.championArray);

  }

}
