import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CurrenciesService } from '../currencies.service';
import { getCurrencies, getCurrenciesSuccess, getCurrenciesError } from './currencies.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CurrenciesEffects {
  private actions$ = inject(Actions);
  private currenciesService = inject(CurrenciesService);

  loadCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrencies),
      mergeMap(() =>
        this.currenciesService.getCurrencies().pipe(
          map(currencies => getCurrenciesSuccess({ currencies })),
          catchError(() => of(getCurrenciesError()))
        )
      )
    )
  );
}
