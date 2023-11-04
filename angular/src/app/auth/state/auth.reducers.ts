import { Action, createReducer, on } from '@ngrx/store';
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
    updateLocalStorage(authState);
    return {
      ...authState
    };
  }),
  on(fromAuth.logOut, () => {
    var newState: AuthState = {
      email: '',
      token: '',
      baseCurrencyCode: ''
    }

    updateLocalStorage(newState);
    return newState;
  })
);

function updateLocalStorage(authState: AuthState) {
  localStorage.setItem('email', authState.email);
  localStorage.setItem('token', authState.token);
  localStorage.setItem('baseCurrencyCode', authState.baseCurrencyCode);
}

export function authReducers(state = initialAuthState, actions: Action): AuthState {
  return reducer(state, actions);
}
