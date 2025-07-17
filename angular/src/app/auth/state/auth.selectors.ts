import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateModel } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthStateModel>('authState');

export const selectAuth = createSelector(
  selectAuthState,
  (state) => state
);

export const selectDefaultCurrency = createSelector(
  selectAuthState,
  (state) => state.baseCurrencyCode
);
