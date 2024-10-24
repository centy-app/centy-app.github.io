import { CategoryTree } from '../categories.models';

export class GetCategories {
  public static readonly type = '[Categories] Get Categories';
}

export class GetCategoriesSuccess {
  public static readonly type = '[Categories] Get Categories Success';
  constructor(public readonly payload: { categories: CategoryTree[] }) { }
}

export class GetCategoriesError {
  public static readonly type = '[Categories] Get Categories Error';
}

export class GetSpendingCategories {
  public static readonly type = '[Categories] Get Spending Categories';
}

export class GetAssetsCategories {
  public static readonly type = '[Categories] Get Assets Categories';
}
