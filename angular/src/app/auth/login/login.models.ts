export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  baseCurrencyCode: string;
  errors: string[],
  success: boolean
}

export interface LoginState {
  email: string;
  token: string;
  baseCurrencyCode: string;
}
