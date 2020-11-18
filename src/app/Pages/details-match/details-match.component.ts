import {Component, OnInit} from '@angular/core';
import {ChampionService} from '../../Services/champion.service';
// @ts-ignore
import matchJSON from '../../../assets/json/details-match.json'
@Component({
  selector: 'app-details-match',
  templateUrl: './details-match.component.html',
  styleUrls: ['./details-match.component.css']
})
export class DetailsMatchComponent implements OnInit {

  champions;
  matchArrayParticipant;
  matchArrayParticipantDetails;
  champion;
  championArray;
  version;
  participantId;
  key;
  summonerName = 'Phyrro';
  i = 0;
  splash;
  gameVersion: string;
  stats: any;
  constructor(private championService: ChampionService) {
  }

  ngOnInit(): void {
    console.log(matchJSON);
    this.matchArrayParticipant = Object.values(matchJSON.participantIdentities);
    this.matchArrayParticipantDetails = Object.values(matchJSON.participants);
    this.gameVersion = matchJSON.gameVersion;
    console.log(this.matchArrayParticipantDetails);


    // GET THE PARTICIPANT ID
    this.matchArrayParticipant.forEach(participant => {
      if (participant.player.summonerName === this.summonerName){
        this.participantId = participant.participantId;
      }
    });
    console.log(this.participantId);

    // GET THE CHAMPION ID OF THE PARTICIPANT
    this.matchArrayParticipantDetails.forEach(participant => {
      if (participant.participantId === this.participantId){
        this.stats = participant.stats;
        this.key = participant.championId.toString();
      }
    });
    console.log(this.key);
    console.log(this.stats);





    // GET CHAMPION OF THE SELECTED PLAYER
    this.championService.getChampionAll().subscribe(res => {
      this.champions = res;

      console.log(this.champions.data);
      const length = Object.keys(this.champions.data).length;
      this.championArray = Object.values(this.champions.data);
      // console.log(this.championArray);

      this.championArray.forEach(value => {
          if (value.key === this.key) {
            this.champion = value;
            // console.log(this.champion);
          }
      });
      this.splash = this.championService.splashChamp + this.champion.name +'_0.jpg';
      this.championService.getSpecificChampion(this.champion.name).subscribe(res => {
        console.log(res.data);
      });

      // Object.values(this.champions.data).forEach(value => {
      //   if (value === this.key) {
      //     this.champion = value;
      //     console.log(value);
      //
      //   }
      //
      //
      // })

      // for (this.i = 0; this.i <= length; this.i ++) {
      //   console.log(this.championArray[this.i]);
      //   if (this.championArray[this.i].key === 1) {
      //     console.log('trouvé')
      //   }
      // }
    });
  }

}
