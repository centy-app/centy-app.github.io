import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, mergeMap, of } from "rxjs";
import { environment } from "src/environments/environment";
import { RegisterRequest, RegisterResponse } from "./register.models";
import { LoginResponse } from "../login/login.models";
import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registerUrl = environment.baseApiUrl + 'auth/register';

  constructor(private http: HttpClient, private readonly loginService: LoginService) { }

  registerAndLoginRemote(registerRequest: RegisterRequest): Observable<LoginResponse> {
    var registerEmptyResponse = {
      email: '',
      token: '',
      baseCurrencyCode: ''
    };

    return this.registerRemote(registerRequest).pipe(
      mergeMap((result) => {
        if (!result.success) {
          return of({
            ...result,
            ...registerEmptyResponse
          });
        }

        // Let's login since register went well
        return this.loginService.loginRemote({
          email: registerRequest.email,
          password: registerRequest.password
        });
      }),
      catchError((err) => {
        return of({
          errors: err?.error?.errors,
          success: false,
          ...registerEmptyResponse
        });
      })
    );
  }

  registerRemote(registerModel: RegisterRequest): Observable<RegisterResponse> {
    const headers = { 'content-type': 'application/json' };
    return this.http
      .post<RegisterResponse>(this.registerUrl, registerModel, { headers })
      .pipe(
        mergeMap(() => {
          return of({
            errors: [],
            success: true
          })
        }),
        catchError((err) => {
          return of({
            errors: err?.error?.errors,
            success: false
          });
        })
      );
  }
}
