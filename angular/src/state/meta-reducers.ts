import { ActionReducer, MetaReducer } from "@ngrx/store";
import { AppState } from "./app-state.model";
import { AuthState } from "src/app/auth/state";
import * as fromAuth from "src/app/auth/state"

function metaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);
    if (action.type == fromAuth.logIn.type || action.type == fromAuth.logOut.type) {
      updateLocalStorage(nextState?.authState);
    }

    return nextState;
  };
}

function updateLocalStorage(authState: AuthState | undefined) {
  localStorage.setItem('email', authState?.email ?? '');
  localStorage.setItem('token', authState?.token ?? '');
  localStorage.setItem('baseCurrencyCode', authState?.baseCurrencyCode ?? '');
}

export const metaReducers: MetaReducer<AppState>[] = [metaReducer];
