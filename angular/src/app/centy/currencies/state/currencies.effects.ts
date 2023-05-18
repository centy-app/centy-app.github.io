import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromCurrencies from './index';
import { AppState } from 'src/state/app-state.model';
import { CurrenciesService } from '../currencies.service';
import { Currency } from './currencies.models';

@Injectable()
export class CurrenciesEffects {
    constructor(private readonly actions$: Actions,
        private readonly currenciesService: CurrenciesService,
        private store: Store<AppState>) { }

    getCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCurrencies.getCurrencies.type),
            withLatestFrom(this.store.select((store) => store.currencies)),
            filter(([_, state]) => state.currencies.length == 0),
            switchMap(([_, state]) => {
                if (state.currencies.length == 0) {
                    return this.currenciesService.getCurrenciesFromRemote()
                } else {
                    return of(state.currencies);
                }
            }),
            map((currencies: Currency[]) => fromCurrencies.getCurrenciesSuccess({ currencies }))
        )
    );
}
