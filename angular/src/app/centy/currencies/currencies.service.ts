import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Currency } from './currencies.models';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  private symbolsUrl = environment.baseApiUrl + 'currencies/symbols';

  constructor(private http: HttpClient) { }

  public getCurrenciesFromRemote(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.symbolsUrl);
  }
}
