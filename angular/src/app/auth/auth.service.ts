import { Injectable } from "@angular/core";
import { AuthState } from "./auth.models";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authEmptyState: AuthState = { email: '', token: '', baseCurrencyCode: '' };
  private authState$ = new BehaviorSubject<AuthState>({ ...this.authEmptyState });

  constructor() { }

  public getAuthState(): BehaviorSubject<AuthState> {
    if (!this.authState$.value.token && localStorage.getItem('token')) {
      this.restoreFromLocalStorage();
      return this.authState$;
    }

    return this.authState$;
  }

  public setAuthState(authState: AuthState) {
    this.authState$.next(authState);
    this.saveToLocalStorage(authState);
  }

  public logout() {
    this.setAuthState({ ...this.authEmptyState });
  }

  private saveToLocalStorage(authState: AuthState) {
    localStorage.setItem('email', authState.email);
    localStorage.setItem('token', authState.token);
    localStorage.setItem('baseCurrencyCode', authState.baseCurrencyCode);
  }

  private restoreFromLocalStorage() {
    this.authState$.next({
      email: localStorage.getItem('email') ?? '',
      token: localStorage.getItem('token') ?? '',
      baseCurrencyCode: localStorage.getItem('baseCurrencyCode') ?? ''
    });
  }
}
