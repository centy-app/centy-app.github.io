import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoriesStateModel } from './categories.state';

export const selectCategoriesState = createFeatureSelector<CategoriesStateModel>('categoriesState');

export const selectCategories = createSelector(
  selectCategoriesState,
  (state) => state?.categories ?? []
);

export const selectSpendingCategories = createSelector(
  selectCategoriesState,
  (state) => state?.spendingCategories ?? []
);

export const selectAssetsCategories = createSelector(
  selectCategoriesState,
  (state) => state?.assetsCategories ?? []
);

export const selectIsLoading = createSelector(
  selectCategoriesState,
  (state) => state?.isLoading ?? false
); 