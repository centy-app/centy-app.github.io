import { AuthStateModel } from './auth.models';

export class LogIn {
  static readonly type = '[Auth] Log In';
  constructor(public payload: AuthStateModel) {}
}

export class LogOut {
  static readonly type = '[Auth] Log Out';
}
