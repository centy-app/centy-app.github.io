import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { LoginRequest, LoginResponse, LoginState } from "./login.models";
import { BehaviorSubject, Observable, catchError, mergeMap, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private loginUrl = environment.baseApiUrl + 'auth/login';
    private loginState$ = new BehaviorSubject<LoginState>({
        email: '',
        token: '',
        baseCurrencyCode: ''
    });

    constructor(private http: HttpClient) { }

    getLoginState(): BehaviorSubject<LoginState> {
        if (!this.loginState$.value.token && localStorage.getItem('token')) {
            this.restoreFromLocalStorage();
            return this.loginState$;
        } else {
            return this.loginState$;
        }
    }

    loginRemote(loginModel: LoginRequest): Observable<LoginResponse> {
        const headers = { 'content-type': 'application/json' };
        return this.http.post<LoginResponse>(this.loginUrl, loginModel, { headers })
            .pipe(
                mergeMap((result) => {
                    console.log(loginModel.email + ' sucesfully logged in.');
                    this.setLoginState({
                        email: result.email,
                        token: result.token,
                        baseCurrencyCode: result.baseCurrencyCode
                    });
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

    logout() {
        this.setLoginState({
            email: '',
            token: '',
            baseCurrencyCode: ''
        });
    }

    private setLoginState(loginState: LoginState) {
        this.loginState$.next(loginState);
        this.saveToLocalStorage(loginState);
    }

    private saveToLocalStorage(loginState: LoginState) {
        localStorage.setItem('email', loginState.email);
        localStorage.setItem('token', loginState.token);
        localStorage.setItem('baseCurrencyCode', loginState.baseCurrencyCode);
    }

    private restoreFromLocalStorage() {
        this.loginState$.next({
            email: localStorage.getItem('email') ?? '',
            token: localStorage.getItem('token') ?? '',
            baseCurrencyCode: localStorage.getItem('baseCurrencyCode') ?? ''
        });
    }
}
