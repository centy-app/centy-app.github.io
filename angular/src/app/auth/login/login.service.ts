import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginRequest, LoginResponse } from "./login.models";
import { Observable, catchError, mergeMap, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    loginUrl = environment.baseApiUrl + 'auth/login';

    constructor(private http: HttpClient) { }

    loginRemote(loginModel: LoginRequest): Observable<LoginResponse> {
        const headers = { 'content-type': 'application/json' };
        return this.http
            .post<LoginResponse>(this.loginUrl, loginModel, { headers })
            .pipe(
                mergeMap((result) => {
                    console.log(loginModel.email + ' sucesfully logged in.');
                    return of({
                        ...result,
                        errors: [],
                        success: true
                    })
                }),
                catchError((err) => {
                    return of({
                        errors: err?.error?.errors,
                        success: false,
                        email: '',
                        token: '',
                        baseCurrencyCode: ''
                    });
                })
            );
    }
}
