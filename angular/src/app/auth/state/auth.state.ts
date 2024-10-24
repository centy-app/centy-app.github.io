import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LogIn, LogOut } from "./auth.actions";

export interface AuthStateModel {
  email: string;
  token: string;
  baseCurrencyCode: string;
}

export const initialAuthState: AuthStateModel = {
  email: localStorage.getItem('email') ?? '',
  token: localStorage.getItem('token') ?? '',
  baseCurrencyCode: localStorage.getItem('baseCurrencyCode') ?? ''
};

@State<AuthStateModel>({
  name: 'authState',
  defaults: initialAuthState
})
@Injectable()
export class AuthState {

  @Selector()
  static getAuth(state: AuthStateModel) {
    return state;
  }

  @Selector()
  static getDefaultCurrency(state: AuthStateModel) {
    return state.baseCurrencyCode;
  }

  @Action(LogIn)
  logIn(ctx: StateContext<AuthStateModel>, action: LogIn) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ...action.payload
    });
  }

  @Action(LogOut)
  logOut(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      email: '',
      token: '',
      baseCurrencyCode: ''
    });
  }
}
