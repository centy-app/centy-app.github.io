import { createAction, props } from '@ngrx/store';

export const logIn = createAction(
  '[Auth] Log In',
  props<{ email: string; token: string; baseCurrencyCode: string }>()
);

export const logOut = createAction('[Auth] Log Out');
