export interface Currency {
  code: string;
  description: string;
  symbol: string;
}

export interface CurrenciesState {
  currencies: Currency[];
  isLoading: boolean;
}
