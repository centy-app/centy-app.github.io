import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrenciesStateModel } from './currencies.state';

export const selectCurrenciesState = createFeatureSelector<CurrenciesStateModel>('currenciesState');

export const selectCurrencies = createSelector(
  selectCurrenciesState,
  (state) => state.currencies
);

export const selectIsLoading = createSelector(
  selectCurrenciesState,
  (state) => state.isLoading
);
