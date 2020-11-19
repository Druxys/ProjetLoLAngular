import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {HistoryService} from '../../Services/history.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: FormGroup;
  loading = false;
  error = '';

  private submitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private historyService: HistoryService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      summoner: ['', Validators.required]
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }

    this.loading = true;
    this.historyService.getHistoryBySummonerName(this.f.summoner.value)
      .pipe(first())
      .subscribe({
        next: (history) => {
          console.log(history);
          // get return url from route parameters or default to '/'
          this.router.navigate(['/summoner'], {state : {history : history, user: this.f.summoner.value }});
        },
        error: error => {
          this.loading = false;
          this.error = error;
        }
      });
  }


}
