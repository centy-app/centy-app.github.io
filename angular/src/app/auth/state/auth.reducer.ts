import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { logIn, logOut } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(logIn, (state, { email, token, baseCurrencyCode }) => ({ ...state, email, token, baseCurrencyCode })),
  on(logOut, () => ({ email: '', token: '', baseCurrencyCode: '' }))
);
