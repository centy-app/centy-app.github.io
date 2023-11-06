import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Currency } from './state/currencies.models';
import { AppState } from 'src/state/app-state.model';
import * as fromCurrencies from '../../centy/currencies/state';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  symbolsUrl = environment.baseApiUrl + 'currencies/symbols';

  constructor(private http: HttpClient, private readonly store: Store<AppState>) { }

  getCurrencies(): Observable<Currency[]> {
    this.dispatchIfNeeded();
    return this.store.select((store) => store.currenciesState.currencies);
  }

  isLoading(): Observable<boolean> {
    return this.store.select((store) => store.currenciesState.isLoading);
  }

  getCurrenciesFromRemote(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.symbolsUrl);
  }

  private dispatchIfNeeded(): void {
    this.store.select((store) => store.currenciesState.currencies).pipe(take(1)).subscribe(
      currencies => {
        if (currencies.length == 0) {
          this.store.dispatch(fromCurrencies.getCurrencies());
        }
      }
    );
  }
}
