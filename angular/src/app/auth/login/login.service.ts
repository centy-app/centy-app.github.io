import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, mergeMap, of } from "rxjs";
import { LoginRequest, LoginResponse } from "./login.models";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = environment.baseApiUrl + 'auth/login';

  constructor(private http: HttpClient, private authService: AuthService) { }

  loginRemote(loginModel: LoginRequest): Observable<LoginResponse> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<LoginResponse>(this.loginUrl, loginModel, { headers })
      .pipe(
        mergeMap((result) => {
          this.authService.setAuthState({ ...result });
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
