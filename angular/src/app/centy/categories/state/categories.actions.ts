import { createAction, props } from '@ngrx/store';
import { CategoryTree } from '../categories.models';

export const getCategories = createAction('[Categories] Get Categories');

export const getCategoriesSuccess = createAction(
  '[Categories] Get Categories Success',
  props<{ categories: CategoryTree[] }>()
);

export const getCategoriesError = createAction('[Categories] Get Categories Error');

export const getSpendingCategories = createAction('[Categories] Get Spending Categories');

export const getAssetsCategories = createAction('[Categories] Get Assets Categories');
