import { createReducer, on } from '@ngrx/store';
import { initialCategoriesState, CategoriesStateModel } from './categories.state';
import { getCategories, getCategoriesSuccess, getCategoriesError, getSpendingCategories, getAssetsCategories } from './categories.actions';
import { CategoryType } from '../categories.models';

export const categoriesReducer = createReducer(
  initialCategoriesState,
  on(getCategories, (state) => ({ ...state, isLoading: true })),
  on(getCategoriesSuccess, (state, { categories }) => {
    const spendingCategories = categories.filter(category => category.type === CategoryType.Spending);
    const assetsCategories = categories.filter(category => category.type === CategoryType.Asset);
    return {
      ...state,
      categories,
      spendingCategories,
      assetsCategories,
      isLoading: false
    };
  }),
  on(getCategoriesError, (state) => ({ ...state, isLoading: false })),
  on(getSpendingCategories, (state) => ({ ...state, isLoading: true })),
  on(getAssetsCategories, (state) => ({ ...state, isLoading: true }))
);
