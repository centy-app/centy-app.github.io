import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Currency } from 'src/app/centy/currencies/state/currencies.models';
import { Observable } from 'rxjs';

import * as fromCurrencies from '../../centy/currencies/state';
import { AppState } from 'src/state/app-state.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currencies$: Observable<Currency[]>;
  isLoading$: Observable<boolean>;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  onRegisterClick() {
    console.log("initDispatch");
    this.initDispatch();
  }

  private initDispatch(): void {
    this.store.dispatch(fromCurrencies.getCurrencies());
  }

  private initSubscriptions(): void {
    this.currencies$ = this.store.select((store) => store.currencies.currencies);
    this.isLoading$ = this.store.select((store) => store.currencies.isLoading);
  }
}
