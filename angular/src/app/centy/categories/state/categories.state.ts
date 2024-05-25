import { CategoryTree } from "../categories.models";

export interface CategoriesStateModel {
  categories: CategoryTree[];
  isLoading: boolean;
}
