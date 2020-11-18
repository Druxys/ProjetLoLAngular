import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Summoner} from '../Models/Summoner';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataDragonService {

  summonerIcon = 'https://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/4050.png';

  constructor(private http: HttpClient) { }


  getIcon(): Observable<Summoner> {
    const url = `https://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/4050.png`;
    return this.http.get<Summoner>(url).pipe(
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
