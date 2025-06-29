import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, tap } from 'rxjs';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { GetCurrencies, GetCurrenciesError, GetCurrenciesSuccess } from './currencies.actions';
import { CurrenciesService } from '../currencies.service';
import { Currency } from '../currencies.models';

export interface CurrenciesStateModel {
  currencies: Currency[];
  isLoading: boolean;
}

@State<CurrenciesStateModel>({
  name: 'currenciesState',
  defaults: {
    currencies: [],
    isLoading: false
  }
})
@Injectable()
export class CurrenciesState {
  private destroyRef = inject(DestroyRef);

  constructor(private currenciesService: CurrenciesService) {
  }

  @Selector()
  static getCurrencies(state: CurrenciesStateModel) {
    return state.currencies;
  }

  @Selector()
  static getIsLoading(state: CurrenciesStateModel) {
    return state.isLoading;
  }

  @Action(GetCurrencies)
  getCurrencies({ dispatch, patchState }: StateContext<CurrenciesStateModel>) {
    patchState({ isLoading: true });

    this.currenciesService.getCurrencies().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(currencies => {
        return dispatch(new GetCurrenciesSuccess({ currencies }));
      }),
      catchError((error) => {
        return dispatch(new GetCurrenciesError());
      })
    ).subscribe();
  }

  @Action(GetCurrenciesSuccess)
  getCurrenciesSuccess({ patchState }: StateContext<CurrenciesStateModel>, { payload }: GetCurrenciesSuccess) {
    patchState({
      isLoading: false,
      currencies: payload.currencies
    });
  }

  @Action(GetCurrenciesError)
  getCurrenciesError({ patchState }: StateContext<CurrenciesStateModel>) {
    patchState({
      isLoading: false
    });
  }
}
