import { Action, createReducer, on } from '@ngrx/store';
import { CurrenciesState } from './currencies.models';
import * as fromCurrencies from './index';

export const initialCurrenciesState: CurrenciesState = {
  currencies: [],
  isLoading: false
};

const reducer = createReducer<CurrenciesState>(
  initialCurrenciesState,
  on(fromCurrencies.getCurrencies, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(fromCurrencies.getCurrenciesSuccess, (state, { currencies }) => {
    return {
      ...state,
      isLoading: false,
      currencies
    };
  }),
  on(fromCurrencies.getCurrenciesError, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  })
);

export function currenciesReducers(state = initialCurrenciesState, actions: Action): CurrenciesState {
  return reducer(state, actions);
}
