import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CategoriesService } from '../categories.service';
import { CategoryTree, CategoryType } from '../categories.models';
import { tap, catchError } from 'rxjs/operators';
import { GetCategories, GetCategoriesError, GetCategoriesSuccess, GetSpendingCategories, GetAssetsCategories } from './categories.actions';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

export class CategoriesStateModel {
  categories: CategoryTree[];
  spendingCategories: CategoryTree[];
  assetsCategories: CategoryTree[];
  isLoading: boolean;
}

@State<CategoriesStateModel>({
  name: 'categoriesState',
  defaults: {
    categories: [],
    spendingCategories: [],
    assetsCategories: [],
    isLoading: false,
  },
})
@Injectable()
export class CategoriesState {
  private destroyRef = inject(DestroyRef);

  constructor(private categoriesService: CategoriesService) { }

  @Selector()
  static getCategories(state: CategoriesStateModel) {
    return state.categories;
  }

  @Selector()
  static getSpendingCategories(state: CategoriesStateModel) {
    return state.spendingCategories;
  }

  @Selector()
  static getAssetsCategories(state: CategoriesStateModel) {
    return state.assetsCategories;
  }

  @Selector()
  static isLoading(state: CategoriesStateModel) {
    return state.isLoading;
  }

  @Action(GetCategories)
  getCategories({ patchState, dispatch }: StateContext<CategoriesStateModel>) {
    patchState({ isLoading: true });

    return this.categoriesService.getCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(categories => {
        return dispatch(new GetCategoriesSuccess({ categories }));
      }),
      catchError((error) => {
        return dispatch(new GetCategoriesError());
      })
    ).subscribe();
  }

  @Action(GetCategoriesSuccess)
  getCategoriesSuccess({ patchState }: StateContext<CategoriesStateModel>, { payload }: GetCategoriesSuccess) {
    const spendingCategories = payload.categories.filter(category => category.type === CategoryType.Spending);
    const assetsCategories = payload.categories.filter(category => category.type === CategoryType.Asset);

    patchState({
      categories: payload.categories,
      spendingCategories: spendingCategories,
      assetsCategories: assetsCategories,
      isLoading: false
    });
  }

  @Action(GetCategoriesError)
  getCategoriesError({ patchState }: StateContext<CategoriesStateModel>) {
    patchState({
      isLoading: false
    });
  }

  @Action(GetSpendingCategories)
  getSpendingCategories({ patchState, dispatch }: StateContext<CategoriesStateModel>) {
    patchState({ isLoading: true });

    return this.categoriesService.getCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(categories => {
        const spendingCategories = categories.filter(category => category.type === CategoryType.Spending);
        patchState({ spendingCategories: spendingCategories, isLoading: false });
      }),
      catchError((error) => {
        return dispatch(new GetCategoriesError());
      })
    ).subscribe();
  }

  @Action(GetAssetsCategories)
  getAssetsCategories({ patchState, dispatch }: StateContext<CategoriesStateModel>) {
    patchState({ isLoading: true });

    return this.categoriesService.getCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(categories => {
        const assetsCategories = categories.filter(category => category.type === CategoryType.Asset);
        patchState({ assetsCategories: assetsCategories, isLoading: false });
      }),
      catchError((error) => {
        return dispatch(new GetCategoriesError());
      })
    ).subscribe();
  }
}
