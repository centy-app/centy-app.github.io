import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesStateModel } from './categories.state';

export const selectCategoriesState = createFeatureSelector<CategoriesStateModel>('categoriesState');

export const getCategories = createSelector(
  selectCategoriesState,
  (state) => state?.categories ?? []
);

export const getSpendingCategories = createSelector(
  selectCategoriesState,
  (state) => state?.spendingCategories ?? []
);

export const getAssetsCategories = createSelector(
  selectCategoriesState,
  (state) => state?.assetsCategories ?? []
);

export const isLoading = createSelector(
  selectCategoriesState,
  (state) => state?.isLoading ?? false
); 