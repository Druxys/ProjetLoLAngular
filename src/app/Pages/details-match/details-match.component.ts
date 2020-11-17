import {Component, OnInit} from '@angular/core';
import {ChampionService} from '../../Services/champion.service';

@Component({
  selector: 'app-details-match',
  templateUrl: './details-match.component.html',
  styleUrls: ['./details-match.component.css']
})
export class DetailsMatchComponent implements OnInit {

  champions;
  champion;
  championArray;
  version;
  key = '51';
  i = 0;
  constructor(private championService: ChampionService) {
  }

  ngOnInit(): void {
    this.championService.getChampionAll().subscribe(res => {
      this.champions = res;

      console.log(this.champions.data);
      const length = Object.keys(this.champions.data).length;
      this.championArray = Object.values(this.champions.data);
      console.log(this.championArray);

      this.championArray.forEach(value => {
          if (value.key === this.key) {
            this.champion = value;
            console.log(this.champion);
          }
      });
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
