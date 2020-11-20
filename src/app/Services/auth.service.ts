import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../Models/User';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  url = environment.API_URL;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  signIn(username: string, password: string) {
    return this.httpClient.post<User>(this.url + '/api/login_check', { username, password })
      .pipe(map(
        userData => {
          localStorage.setItem('currentUser', JSON.stringify(userData));
          return userData;
        }
      ), catchError(this.handleError<User>('errorLogin')));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
