import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Version} from '../Models/Version';
import {Champion} from '../Models/Champion';
import {VersionService} from './version.service';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {

  champList = 'https://ddragon.leagueoflegends.com/cdn/10.22.1/data/fr_FR/champion.json';

  specificChamp = 'https://ddragon.leagueoflegends.com/cdn/10.22.1/data/fr_FR/champion/';

  // Splash Art du champion du joueur
  splashChamp = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/';

  // Icone du champ du joueur
  squareChamp = 'http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/Aatrox.png';
  // Skill du champ du joueur

  // Pour trouver une abilité il faut la chercher dans  dans la route du champion, dans la le champ "spells". C'est à l' "id"
  abilityChamp = 'http://ddragon.leagueoflegends.com/cdn/10.22.1/img/spell/AatroxQ.png';
  public versionChamp: any;
   version: any;

  constructor(private http: HttpClient, public versionService: VersionService) {
  this.getVersion().subscribe(version => {
    this.version = version;
  });
  }

  getVersion() {
    console.log(this.version);
    return this.http.get('https://ddragon.leagueoflegends.com/api/versions.json').pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<Champion>('error get version datadragon'))
    );
  }

  getChampionAll(): Observable<Champion> {
    console.log(this.version)
    // const url = `https://ddragon.leagueoflegends.com/cdn/${this.version[0]}/data/fr_FR/champion.json`;
    const url = `https://ddragon.leagueoflegends.com/cdn/10.22.1/data/fr_FR/champion.json`;
    return this.http.get<Champion>(url).pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<Champion>('error get version datadragon'))
    );
  }

  getSpecificChampion(champ): Observable<Champion> {
    const url = this.specificChamp + champ + '.json';
    return this.http.get<Champion>(url).pipe(
      tap(_ => console.log('get version')),
      catchError(this.handleError<Champion>('error get version datadragon'))
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
