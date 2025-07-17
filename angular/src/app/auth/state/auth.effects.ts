import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { logIn, logOut } from './auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  logIn$ = createEffect(
    () => this.actions$.pipe(
      ofType(logIn),
      tap(({ payload }) => {
        localStorage.setItem('email', payload.email ?? '');
        localStorage.setItem('token', payload.token ?? '');
        localStorage.setItem('baseCurrencyCode', payload.baseCurrencyCode ?? '');
      })
    ),
    { dispatch: false }
  );

  logOut$ = createEffect(
    () => this.actions$.pipe(
      ofType(logOut),
      tap(() => {
        localStorage.setItem('email', '');
        localStorage.setItem('token', '');
        localStorage.setItem('baseCurrencyCode', '');
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
} 