import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrenciesStateModel } from './currencies.state';

export const selectCurrenciesState = createFeatureSelector<CurrenciesStateModel>('currenciesState');

export const getCurrencies = createSelector(
  selectCurrenciesState,
  (state) => state.currencies
);

export const getIsLoading = createSelector(
  selectCurrenciesState,
  (state) => state.isLoading
); 