import { createReducer, on } from '@ngrx/store';
import { initialAuthState, AuthStateModel } from './auth.state';
import { logIn, logOut } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(logIn, (state, { payload }) => ({ ...state, ...payload })),
  on(logOut, () => ({ email: '', token: '', baseCurrencyCode: '' }))
); 