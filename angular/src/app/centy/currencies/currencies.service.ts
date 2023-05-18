import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Currency } from './state/currencies.models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CurrenciesService {
    symbolsUrl = environment.baseApiUrl + 'currencies/symbols';

    constructor(private http: HttpClient) {}

    getCurrencies(): Observable<Currency[]> {
        return this.http.get<Currency[]>(this.symbolsUrl);
    }
}
