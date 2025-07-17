import { Currency } from '../currencies.models';

export interface CurrenciesStateModel {
  currencies: Currency[];
  isLoading: boolean;
}

export const initialCurrenciesState: CurrenciesStateModel = {
  currencies: [],
  isLoading: false
};
