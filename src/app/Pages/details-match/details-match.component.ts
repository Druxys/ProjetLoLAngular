import { Component, OnInit } from '@angular/core';
import { ChampionService } from '../../Services/champion.service';
import matchJSON from '../../../assets/json/details-match.json';
import { Chart } from 'node_modules/chart.js';

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
      if (participant.player.summonerName === this.summonerName) {
        this.participantId = participant.participantId;
      }
    });
    console.log(this.participantId);

    // GET THE CHAMPION ID OF THE PARTICIPANT
    this.matchArrayParticipantDetails.forEach(participant => {
      if (participant.participantId === this.participantId) {
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
      this.splash = this.championService.splashChamp + this.champion.name + '_0.jpg';
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

    // CHART JS DEGATS
    const myChart5 = new Chart('myChart5', {
      type: 'horizontalBar',
      data: {
        labels: ['Dégats Magique', 'Dégats physique', 'True Damage', 'Total de dégats', 'Dégats à l\'objectif', 'Dégats aux tourelles', 'Self Mitigated Damage'],
        datasets: [{
          label: 'Dégats',
          data:
            [
              parseInt(this.stats.magicDamageDealt),
              parseInt(this.stats.physicalDamageDealt),
              parseInt(this.stats.trueDamageDealt),
              parseInt(this.stats.totalDamageDealt),
              parseInt(this.stats.damageDealtToObjectives),
              parseInt(this.stats.damageDealtToTurrets),
              parseInt(this.stats.damageSelfMitigated)
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS DEGATS RECU
    const myChart6 = new Chart('myChart6', {
      type: 'horizontalBar',
      data: {
        labels: ['Dégats Magique reçu', 'Dégats physique reçu', 'True Damage reçu', 'Total de dégats reçu'],
        datasets: [{
          label: 'Dégats reçu',
          data:
            [
              parseInt(this.stats.magicalDamageTaken),
              parseInt(this.stats.physicalDamageTaken),
              parseInt(this.stats.trueDamageTaken),
              parseInt(this.stats.totalDamageTaken)
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS DPS SUR CHAMPIONS
    const myChart1 = new Chart('myChart1', {
      type: 'horizontalBar',
      data: {
        labels: ['Dégats Magique', 'Dégats physique', 'True Damage', 'Total de dégats'],
        datasets: [{
          label: 'Dégats sur les champions',
          data:
            [
              parseInt(this.stats.magicDamageDealtToChampions),
              parseInt(this.stats.physicalDamageDealtToChampions),
              parseInt(this.stats.trueDamageDealtToChampions),
              parseInt(this.stats.totalDamageDealtToChampions)
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS SCORES
    const myChart2 = new Chart('myChart2', {
      type: 'horizontalBar',
      data: {
        labels: ['Score du joueur', 'Objective Player Score', 'Score de Vision', 'Total Player Score', 'Total Score Rank'],
        datasets: [{
          label: 'Scores',
          data:
            [
              parseInt(this.stats.combatPlayerScore),
              parseInt(this.stats.objectivePlayerScore),
              parseInt(this.stats.visionScore),
              parseInt(this.stats.totalPlayerScore),
              parseInt(this.stats.totalScoreRank),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS MINIONS TUE
    const myChart3 = new Chart('myChart3', {
      type: 'horizontalBar',
      data: {
        labels: ['Minions Tué', 'Minions Tué Enemy Jungle', 'Minions Tué Team Jungle'],
        datasets: [{
          label: 'Minions tués',
          data:
            [
              parseInt(this.stats.neutralMinionsKilled),
              parseInt(this.stats.neutralMinionsKilledEnemyJungle),
              parseInt(this.stats.neutralMinionsKilledTeamJungle),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS DEPENSES
    const myChart4 = new Chart('myChart4', {
      type: 'horizontalBar',
      data: {
        labels: ['Or gagné', 'Or dépensé', 'Sight Wards acheté', 'Vision Wards acheté'],
        datasets: [{
          label: 'Dépenses',
          data:
            [
              parseInt(this.stats.goldEarned),
              parseInt(this.stats.goldSpent),
              parseInt(this.stats.sightWardsBoughtInGame),
              parseInt(this.stats.visionWardsBoughtInGame),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS MULTIKILLS
    const myChart7 = new Chart('myChart7', {
      type: 'horizontalBar',
      data: {
        labels: ['Double Kills', 'Triple Kills', 'Quadra Kills', 'Penta Kills', 'Killing Sprees', 'Unreal Kills'],
        datasets: [{
          label: 'Multi Kills',
          data:
            [
              parseInt(this.stats.doubleKills),
              parseInt(this.stats.tripleKills),
              parseInt(this.stats.quadraKills),
              parseInt(this.stats.pentaKills),
              parseInt(this.stats.killingSprees),
              parseInt(this.stats.unrealKills),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS DEGATS MULTIKILLS
    const myChart9 = new Chart('myChart9', {
      type: 'horizontalBar',
      data: {
        labels: ['Plus gros Multi Kill', 'Plus gros Critical Strike', 'Plus gros Killing Spree'],
        datasets: [{
          label: 'Dégats Multi Kills',
          data:
            [
              parseInt(this.stats.largestMultiKill),
              parseInt(this.stats.largestCriticalStrike),
              parseInt(this.stats.largestKillingSpree),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


    // CHART JS RATIO
    const myChart8 = new Chart('myChart8', {
      type: 'horizontalBar',
      data: {
        labels: ['Tués', 'Morts', 'Assistances'],
        datasets: [{
          label: 'Ratio',
          data:
            [
              parseInt(this.stats.kills),
              parseInt(this.stats.deaths),
              parseInt(this.stats.assists),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


    // CHART JS SOINS
    const myChart10 = new Chart('myChart10', {
      type: 'horizontalBar',
      data: {
        labels: ['Total de soins', 'Total d\'unité soigné'],
        datasets: [{
          label: 'Soins',
          data:
            [
              parseInt(this.stats.totalHeal),
              parseInt(this.stats.totalUnitsHealed),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS Stat Perk
    const myChart11 = new Chart('myChart11', {
      type: 'horizontalBar',
      data: {
        labels: ['Stat Perk 0', 'Stat Perk 1', 'Stat Perk 2'],
        datasets: [{
          label: 'Stats Perks',
          data:
            [
              parseInt(this.stats.statPerk0),
              parseInt(this.stats.statPerk1),
              parseInt(this.stats.statPerk2),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS CROWD CONTROL
    const myChart12 = new Chart('myChart12', {
      type: 'horizontalBar',
      data: {
        labels: ['Temps de Crowd Controlling', 'Total de Crowd Control'],
        datasets: [{
          label: 'Crowd Control',
          data:
            [
              parseInt(this.stats.timeCCingOthers),
              parseInt(this.stats.totalTimeCrowdControlDealt),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    // CHART JS AUTRES
    const myChart13 = new Chart('myChart13', {
      type: 'horizontalBar',
      data: {
        labels: ['Inhibitor tué', 'Tourelles tué', 'Wards tué', 'Wards Placé', 'Record de temps sans mourir'],
        datasets: [{
          label: 'Autres',
          data:
            [
              parseInt(this.stats.inhibitorKills),
              parseInt(this.stats.turretKills),
              parseInt(this.stats.wardsKilled),
              parseInt(this.stats.wardsPlaced),
              parseInt(this.stats.longestTimeSpentLiving),
            ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

  }
}
