import { createReducer, on } from '@ngrx/store';
import { initialCurrenciesState, CurrenciesStateModel } from './currencies.state';
import { getCurrencies, getCurrenciesSuccess, getCurrenciesError } from './currencies.actions';

export const currenciesReducer = createReducer(
  initialCurrenciesState,
  on(getCurrencies, (state) => ({ ...state, isLoading: true })),
  on(getCurrenciesSuccess, (state, { currencies }) => ({ ...state, isLoading: false, currencies })),
  on(getCurrenciesError, (state) => ({ ...state, isLoading: false }))
); 