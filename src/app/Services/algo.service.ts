import { Injectable } from '@angular/core';
import {RankTier} from "../Models/RankTier";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Team} from "../Models/Team";

@Injectable({
  providedIn: 'root'
})
export class AlgoService {
  rankScore;
  classementTeam;
  rankTier = [];
  tierScore;
  scorePlayerByRankTier;
  win = 0;
  constructor(
    private http: HttpClient
  ) { }

  calculScorePlayer() {
    //requete pour obtenir le rank et le tier
    //requete 100 match
    // foreach win score = score + 2

  }
  getRankTierBySummonerName(summoner): Observable<RankTier> {
    const url = environment.API_URL + '/euw1/riot/GetRankAccount/' + summoner;
    console.log(url);
    return this.http.get<RankTier>(url).pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<RankTier>('error get version datadragon'))
    );
  }
  getTeamID(team): Observable<Team> {
    const url = environment.API_URL + '/getAllTeam?name=' + team;
    console.log(url);
    return this.http.get<Team>(url).pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<RankTier>('error get version datadragon'))
    );
  }

  scorePlayer(){
    let summoner = "Phyrro"
    this.getRankTierBySummonerName(summoner).pipe().subscribe(
      data => {
      this.rankTier.push(data[0].tier)
      this.rankTier.push(data[0].rank)

      switch (this.rankTier[1]) {
        case 'I' :
          this.rankScore = 750;
          break;
        case 'II' :
          this.rankScore = 500;
          break;
        case 'III' :
          this.rankScore = 250;
          break;
        case 'IV' :
          this.rankScore = 0;
          break;
      }
      switch (this.rankTier[0]) {
        case 'IRON' :
          this.tierScore = 1000;
          break;
        case 'BRONZE' :
          this.tierScore = 2000;
          break;
        case 'SILVER' :
          this.tierScore = 3000;
          break;
        case 'GOLD' :
          this.tierScore = 4000;
          break;
        case 'PLATINUM' :
          this.tierScore = 5000;
          break;
        case 'DIAMOND' :
          this.tierScore = 6000;
          break;
        case 'MASTER' :
          this.tierScore = 7000;
          break;
        case 'CHALLENGER' :
          this.tierScore = 8000;
          break;
      }

      this.scorePlayerByRankTier = this.rankScore + this.tierScore;
        console.log(this.scorePlayerByRankTier)

    } );
    console.log(this.scorePlayerByRankTier)
  }

  moyenneTeam() {


  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
