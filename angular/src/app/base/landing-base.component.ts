import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/state/app-state.model';

@Component({
  selector: 'app-auth',
  templateUrl: './landing-base.component.html',
  styleUrls: ['./landing-base.component.scss', './toolbar.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initializeLoginSubscription();
  }

  private initializeLoginSubscription(): void {
    this.authSubscription = this.store.select((store) => store.authState).subscribe(authState => {
      if (authState.token && authState.email) {
        this.router.navigateByUrl('/centy');
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
