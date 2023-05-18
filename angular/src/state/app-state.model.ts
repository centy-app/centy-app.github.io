import { LoginState } from "src/app/auth/login/login.models";
import { CurrenciesState } from "src/app/centy/currencies/state";

export interface AppState {
    currencies: CurrenciesState,
    login: LoginState
}
