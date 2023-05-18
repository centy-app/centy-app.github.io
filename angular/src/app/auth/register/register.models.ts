export interface RegisterRequest {
  email: string;
  password: string;
  baseCurrencyCode: string;
}

export interface RegisterResponse {
  errors: string[];
  success: boolean
}
