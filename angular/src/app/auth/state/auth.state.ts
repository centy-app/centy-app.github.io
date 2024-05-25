import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { AuthStateModel } from "./auth.models";
import { LogIn, LogOut } from "./auth.actions";

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
