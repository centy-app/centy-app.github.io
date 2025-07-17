import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateModel } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthStateModel>('authState');

export const getAuth = createSelector(
  selectAuthState,
  (state) => state
);

export const getDefaultCurrency = createSelector(
  selectAuthState,
  (state) => state.baseCurrencyCode
); 