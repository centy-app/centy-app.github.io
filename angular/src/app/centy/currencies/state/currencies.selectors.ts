import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrenciesState } from './currencies.models';

export const selectCurrenciesState = createFeatureSelector<CurrenciesState>('currencies');
export const selectCurrenciesList = createSelector(selectCurrenciesState, (state) => state.currencies);
export const selectCurrenciesIsLoading = createSelector(selectCurrenciesState, (state) => state.isLoading);
