import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Summoner} from '../Models/Summoner';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    "X-Riot-Token": environment.API_KEY,
  })
};

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {


  constructor(private http: HttpClient) { }

  getSummonerByName(): Observable<Summoner> {
    const url = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Phyrro`;
    return this.http.get<Summoner>(url, httpOptions).pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<Summoner>('error get version datadragon'))
    );
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
