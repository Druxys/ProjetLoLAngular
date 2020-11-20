import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import details from '../../../assets/json/details-match.json'
@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  clickDetailsMatch() {
    console.log('lol')
      this.router.navigateByUrl('/match')
  }

}
