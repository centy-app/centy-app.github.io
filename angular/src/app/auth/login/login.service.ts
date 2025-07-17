import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, mergeMap, of } from "rxjs";
import { Store } from '@ngrx/store';
import { environment } from "src/environments/environment";
import { LoginRequest, LoginResponse } from "./login.models";
import { logIn } from '../state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = environment.baseApiUrl + 'auth/login';

  constructor(private http: HttpClient, private store: Store) { }

  loginRemote(loginModel: LoginRequest): Observable<LoginResponse> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<LoginResponse>(this.loginUrl, loginModel, { headers })
      .pipe(
        mergeMap((result) => {
          this.store.dispatch(logIn({ email: result.email, token: result.token, baseCurrencyCode: result.baseCurrencyCode }));
          return of({
            ...result, errors: [],
            success: true
          })
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
