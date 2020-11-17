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
  splashChamp = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg';

  // Icone du champ du joueur
  squareChamp = 'http://ddragon.leagueoflegends.com/cdn/10.22.1/img/champion/Aatrox.png';
  // Skill du champ du joueur

  // Pour trouver une abilité il faut la chercher dans  dans la route du champion, dans la le champ "spells". C'est à l' "id"
  abilityChamp = 'http://ddragon.leagueoflegends.com/cdn/10.22.1/img/spell/AatroxQ.png';
  public versionChamp: any;

  constructor(private http: HttpClient, public versionService: VersionService) {
    // this.getVersion().then(r => {
    //   this.versionChamp = r;
    // });
  }

  getVersion() {
    // return new Promise(function(resolve, reject)
    // {
    //   this.versionService.getVersionDataDragon().subscribe((data : any) => {
    //     console.log('VersionDD :' + data.n.champion);
    //     // this.versionChamp = data.n.champion;
    //     resolve(data.n.champion)
    //   });
    // }) ;
  }

  getChampionAll(): Observable<Champion> {
    // const version = await this.getVersion();
    // const url = `https://ddragon.leagueoflegends.com/cdn/${version}/data/fr_FR/champion.json`;
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
