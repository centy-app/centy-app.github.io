import { Currency } from '../currencies.models';

export class GetCurrencies {
  public static readonly type = '[Currencies] Get Currencies';
}

export class GetCurrenciesSuccess {
  public static readonly type = '[Currencies] Get Currencies Success';
  constructor(public readonly payload: { currencies: Currency[] }) { }
}

export class GetCurrenciesError {
  public static readonly type = '[Currencies] Get Currencies Error';
}
