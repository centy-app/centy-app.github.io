import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/state/app-state.model';
import * as fromCurrencies from 'src/app/centy/currencies/state';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private symbolsUrl = environment.baseApiUrl + 'currencies/symbols';

  constructor(private http: HttpClient, private readonly store: Store<AppState>) { }

  getCurrencies(): Observable<fromCurrencies.Currency[]> {
    this.init();
    return this.store.select((store) => store.currenciesState.currencies);
  }

  isLoading(): Observable<boolean> {
    return this.store.select((store) => store.currenciesState.isLoading);
  }

  getCurrenciesFromRemote(): Observable<fromCurrencies.Currency[]> {
    return this.http.get<fromCurrencies.Currency[]>(this.symbolsUrl);
  }

  private init(): void {
    this.store.select((store) => store.currenciesState.currencies).pipe(take(1)).subscribe(
      currencies => {
        if (currencies.length == 0) {
          this.store.dispatch(fromCurrencies.getCurrencies());
        }
      }
    );
  }
}
