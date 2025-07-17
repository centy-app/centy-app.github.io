export interface AuthStateModel {
  email: string;
  token: string;
  baseCurrencyCode: string;
}

export const initialAuthState: AuthStateModel = {
  email: localStorage.getItem('email') ?? '',
  token: localStorage.getItem('token') ?? '',
  baseCurrencyCode: localStorage.getItem('baseCurrencyCode') ?? ''
};
