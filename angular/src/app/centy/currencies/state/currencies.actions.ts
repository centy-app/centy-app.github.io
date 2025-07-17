import { createAction, props } from '@ngrx/store';
import { Currency } from '../currencies.models';

export const getCurrencies = createAction('[Currencies] Get Currencies');

export const getCurrenciesSuccess = createAction(
  '[Currencies] Get Currencies Success',
  props<{ currencies: Currency[] }>()
);

export const getCurrenciesError = createAction('[Currencies] Get Currencies Error');
