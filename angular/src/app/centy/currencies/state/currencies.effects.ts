import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { CurrenciesService } from '../currencies.service';
import { Currency } from './currencies.models';
import * as fromCurrencies from './index';

@Injectable()
export class CurrenciesEffects {
  constructor(private readonly actions$: Actions, private readonly currenciesService: CurrenciesService) { }

  getCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCurrencies.getCurrencies.type),
      exhaustMap(() =>
        this.currenciesService.getCurrenciesFromRemote().pipe(
          map((currencies: Currency[]) => fromCurrencies.getCurrenciesSuccess({ currencies })),
          catchError(() => of(fromCurrencies.getCurrenciesError)),
        )
      )
    )
  );
}
