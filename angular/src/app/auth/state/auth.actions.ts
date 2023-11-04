import { createAction, props } from '@ngrx/store';
import { AuthState } from './auth.models';

const prefix = '[Auth]';

export const logIn = createAction(
  `${prefix} Log In`,
  props<AuthState>()
);

export const logOut = createAction(`${prefix} Log Out`);