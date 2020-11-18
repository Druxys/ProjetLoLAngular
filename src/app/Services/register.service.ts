import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../Models/User';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  url = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  signUp(email: string, password: string, summoner_lol: string) {
    return this.httpClient.post<User>(this.url + '/sign-up', { email, password, summoner_lol })
      .pipe(catchError(this.handleError<User>('errorRegister')));
  }
}
