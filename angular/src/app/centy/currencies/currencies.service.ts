import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Currency } from './state/currencies.models';

@Injectable({
    providedIn: 'root'
})
export class CurrenciesService {
    constructor() {
    }

    private currencies: Currency[] = [
        {
            code: 'TS1',
            description: 'Test 2 currency',
            symbol: '$'
        },
        {
            code: 'TS2',
            description: 'Test 3 currency',
            symbol: 'uah'
        }
    ]

    getCurrencies(): Observable<Currency[]> {
        return of(this.currencies);
    }
}
