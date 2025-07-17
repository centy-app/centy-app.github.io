import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../categories.service';
import { getCategories, getCategoriesSuccess, getCategoriesError, getSpendingCategories, getAssetsCategories } from './categories.actions';
import { CategoryType } from '../categories.models';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  private actions$ = inject(Actions);
  private categoriesService = inject(CategoriesService);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories),
      mergeMap(() =>
        this.categoriesService.getCategories().pipe(
          map(categories => getCategoriesSuccess({ categories })),
          catchError(() => of(getCategoriesError()))
        )
      )
    )
  );

  loadSpendingCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSpendingCategories),
      mergeMap(() =>
        this.categoriesService.getCategories().pipe(
          map(categories => {
            const spendingCategories = categories.filter(category => category.type === CategoryType.Spending);
            return getCategoriesSuccess({ categories }); // Will update all slices in reducer
          }),
          catchError(() => of(getCategoriesError()))
        )
      )
    )
  );

  loadAssetsCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAssetsCategories),
      mergeMap(() =>
        this.categoriesService.getCategories().pipe(
          map(categories => {
            const assetsCategories = categories.filter(category => category.type === CategoryType.Asset);
            return getCategoriesSuccess({ categories }); // Will update all slices in reducer
          }),
          catchError(() => of(getCategoriesError()))
        )
      )
    )
  );
} 