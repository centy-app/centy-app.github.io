import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable, catchError, mergeMap, of } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginRequest, LoginResponse } from "./login.models";
import { AppState } from "src/state/app-state.model";
import * as fromAuth from 'src/app/auth/state';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = environment.baseApiUrl + 'auth/login';

  constructor(private http: HttpClient, private readonly store: Store<AppState>) { }

  public loginRemote(loginModel: LoginRequest): Observable<LoginResponse> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<LoginResponse>(this.loginUrl, loginModel, { headers })
      .pipe(
        mergeMap((result) => {
          this.store.dispatch(fromAuth.logIn({
            email: result.email,
            token: result.token,
            baseCurrencyCode: result.baseCurrencyCode
          }));
          return of({ ...result, errors: [], success: true })
        }),
        catchError((err) => {
          return of({
            email: loginModel.email,
            token: '',
            baseCurrencyCode: '',
            errors: err?.error?.errors,
            success: false
          });
        })
      );
  }
}
