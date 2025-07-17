import { createAction, props } from '@ngrx/store';
import { AuthStateModel } from './auth.state';

export const logIn = createAction(
  '[Auth] Log In',
  props<{ payload: AuthStateModel }>()
);

export const logOut = createAction('[Auth] Log Out');
