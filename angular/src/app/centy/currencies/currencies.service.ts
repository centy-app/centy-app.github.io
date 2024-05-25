import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { Currency } from './state/currencies.models';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private symbolsUrl = environment.baseApiUrl + 'currencies/symbols';

  constructor(private http: HttpClient, private store: Store) { }

  public getCurrenciesFromRemote(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.symbolsUrl);
  }
}
