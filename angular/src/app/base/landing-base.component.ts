import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from '../auth/state/auth.state';

@Component({
  selector: 'app-auth',
  templateUrl: './landing-base.component.html',
  styleUrls: ['./landing-base.component.scss', './toolbar.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  private authSubscription: Subscription;
  @Select(AuthState) authState$: Observable<AuthStateModel>;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.initializeLoginSubscription();
  }

  private initializeLoginSubscription(): void {
    this.authSubscription = this.authState$.subscribe((authState) => {
      if (authState.token && authState.email) {
        this.router.navigateByUrl('/centy');
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
