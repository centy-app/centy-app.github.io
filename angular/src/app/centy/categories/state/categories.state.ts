import { CategoryTree } from '../categories.models';

export interface CategoriesStateModel {
  categories: CategoryTree[];
  spendingCategories: CategoryTree[];
  assetsCategories: CategoryTree[];
  isLoading: boolean;
}

export const initialCategoriesState: CategoriesStateModel = {
  categories: [],
  spendingCategories: [],
  assetsCategories: [],
  isLoading: false
};
