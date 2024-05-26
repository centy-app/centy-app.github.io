import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CategoriesService } from '../categories.service';
import { CategoryTree } from '../categories.models';
import { tap, catchError } from 'rxjs/operators';
import { GetCategories, GetCategoriesError, GetCategoriesSuccess } from './categories.actions';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

export class CategoriesStateModel {
  categories: CategoryTree[];
  isLoading: boolean;
}

@State<CategoriesStateModel>({
  name: 'categoriesState',
  defaults: {
    categories: [],
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
    patchState({
      categories: payload.categories,
      isLoading: false
    });
  }

  @Action(GetCategoriesError)
  getCategoriesError({ patchState }: StateContext<CategoriesStateModel>) {
    patchState({
      isLoading: false
    });
  }
}
