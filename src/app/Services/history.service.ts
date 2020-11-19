import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Champion} from '../Models/Champion';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }



  getHistoryBySummonerName(summoner): Observable<History> {
    const url = environment.API_GW + '/passerelle/getHistoryMatchList/' + summoner;
    return this.http.get<History>(url).pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<History>('error get version datadragon'))
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
