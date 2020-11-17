import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {User} from '../Models/User';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  signIn(user: User) {
    return this.httpClient.post<User>(this.url + '/api/login_check', user)
      .pipe(map(
        userData => {
          sessionStorage.setItem('email', user.username);
          sessionStorage.setItem('token', 'Bearer ' + userData.token);
          return userData;
        }
      ), catchError(this.handleError<User>('errorLogin')));
  }
}
