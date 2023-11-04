import { CurrenciesState } from "src/app/centy/currencies/state";
import { AuthState } from "src/app/auth/state";

export interface AppState {
  currenciesState: CurrenciesState,
  authState: AuthState
}
