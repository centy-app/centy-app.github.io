import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/state/app-state.model';
import { CurrenciesService } from '../currencies.service';
import { Currency } from './currencies.models';
import * as fromCurrencies from './index';

@Injectable()
export class CurrenciesEffects {
  constructor(private readonly actions$: Actions,
    private readonly currenciesService: CurrenciesService,
    private store: Store<AppState>) { }

  getCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCurrencies.getCurrencies.type),
      withLatestFrom(this.store.select((store) => store.currenciesState)),
      exhaustMap(([_, currenciesState]) => {
        if (currenciesState.currencies.length == 0) {
          return this.currenciesService.getCurrenciesFromRemote()
        } else {
          return of(currenciesState.currencies);
        }
      }),
      map((currencies: Currency[]) => fromCurrencies.getCurrenciesSuccess({ currencies }))
    )
  );
}
