import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as fromCurrencies from './index';
import { CurrenciesService } from '../currencies.service';
import { Currency } from './currencies.models';

@Injectable()
export class CurrenciesEffects {
    constructor(private readonly actions$: Actions, private readonly currenciesService: CurrenciesService) {
    }

    getCurrencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCurrencies.getCurrencies.type),
            switchMap(() => this.currenciesService.getCurrencies()),
            map((currencies: Currency[]) => fromCurrencies.getCurrenciesSuccess({ currencies }))
        )
    );
}
