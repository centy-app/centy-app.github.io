import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { Currency } from './state/currencies.models';
import { GetCurrenciesError, GetCurrenciesSuccess } from './state/currencies.actions';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private symbolsUrl = environment.baseApiUrl + 'currencies/symbols';

  constructor(private http: HttpClient, private store: Store) { }

  public getCurrenciesFromRemote(): void {
    this.http.get<Currency[]>(this.symbolsUrl).subscribe(
      currencies => {
        this.store.dispatch(new GetCurrenciesSuccess({ currencies }));
      },
      () => {
        this.store.dispatch(new GetCurrenciesError());
      }
    );
  }
}
