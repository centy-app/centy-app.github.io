import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Currency } from 'src/app/centy/currencies/state/currencies.models';
import { Observable } from 'rxjs';

import * as fromCurrencies from '../../centy/currencies/state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currencies$: Observable<Currency[]>;
  isLoading$: Observable<boolean>;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
    this.initDispatch();
    this.initSubscriptions();
  }

  private initDispatch(): void {
    this.store.dispatch(fromCurrencies.getCurrencies());
  }

  private initSubscriptions(): void {
    this.currencies$ = this.store.pipe(select(fromCurrencies.selectCurrenciesList));
    this.isLoading$ = this.store.pipe(select(fromCurrencies.selectCurrenciesIsLoading));
  }
}
