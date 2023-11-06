import { Action, ActionReducer, MetaReducer, createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.models';
import * as fromAuth from './index';

export const initialAuthState: AuthState = {
  email: localStorage.getItem('email') ?? '',
  token: localStorage.getItem('token') ?? '',
  baseCurrencyCode: localStorage.getItem('baseCurrencyCode') ?? ''
};

const reducer = createReducer<AuthState>(
  initialAuthState,
  on(fromAuth.logIn, (_, authState) => {
    return {
      ...authState
    };
  }),
  on(fromAuth.logOut, () => {
    return {
      email: '',
      token: '',
      baseCurrencyCode: ''
    };
  })
);

export function authReducers(state = initialAuthState, actions: Action): AuthState {
  return reducer(state, actions);
}
