import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Currency } from './currencies.models';
import { GetCurrencies, GetCurrenciesError, GetCurrenciesSuccess } from './currencies.actions';
import { CurrenciesService } from '../currencies.service';
import { Injectable } from '@angular/core';

@State<CurrenciesStateModel>({
  name: 'currenciesState',
  defaults: {
    currencies: [],
    isLoading: false
  }
})
@Injectable()
export class CurrenciesState {
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
  getCurrencies({ patchState }: StateContext<CurrenciesStateModel>) {
    patchState({ isLoading: true });

    this.currenciesService.getCurrenciesFromRemote();
  }

  @Action(GetCurrenciesSuccess)
  getCurrenciesSuccess({ patchState }: StateContext<CurrenciesStateModel>, { payload }: GetCurrenciesSuccess) {
    patchState({ isLoading: false, currencies: payload.currencies });
  }

  @Action(GetCurrenciesError)
  getCurrenciesError({ patchState }: StateContext<CurrenciesStateModel>) {
    patchState({ isLoading: false });
  }
}

export interface CurrenciesStateModel {
  currencies: Currency[];
  isLoading: boolean;
}
