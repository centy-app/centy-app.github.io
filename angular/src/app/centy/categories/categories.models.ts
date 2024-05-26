export interface CategoryTree {
  id: string;
  children?: CategoryTree[];
  userId: string;
  type: CategoryType;
  iconId: string;
  name?: string;
  currencyCode?: string;
}

export enum CategoryType {
  Spending = 0,
  Asset = 1,
}

export interface CreateCategoryRequest {
  parentId: string;
  type: CategoryType;
  iconId: string;
  name?: string;
  currencyCode?: string;
}

export interface UpdateCategoryRequest {
  id: string;
  iconId: string;
  name?: string;
}
