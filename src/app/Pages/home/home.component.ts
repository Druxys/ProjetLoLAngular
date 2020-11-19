import { Component, OnInit } from '@angular/core';
import {AlgoService} from "../../Services/algo.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private algoService: AlgoService
  ) { }

  ngOnInit(): void {
    this.algoService.scorePlayer();
    let team = "dolorum"
      this.algoService.getTeamID(team).subscribe(data => {
        let kebab = JSON.parse(JSON.stringify(data))
        let kebab2 = JSON.parse(JSON.stringify(kebab[0].usersTeams[0].user))
         let kebab3 = kebab.forEach();
      })

  }

}
