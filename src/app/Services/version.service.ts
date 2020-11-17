import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Version} from '../Models/Version';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  constructor(private http: HttpClient) { }

  getVersionDataDragon(): Observable<Version> {
    const url = `https://ddragon.leagueoflegends.com/realms/euw.json`;
    return this.http.get<Version>(url).pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<Version>('error get version datadragon'))
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
