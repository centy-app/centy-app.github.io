import { createAction, props } from '@ngrx/store';
import { Currency } from './currencies.models';

const prefix = '[Currencies]';

export const getCurrencies = createAction(`${prefix} Get Currencies`);
export const getCurrenciesSuccess = createAction(
    `${getCurrencies.type} Success`,
    props<{
        currencies: Currency[];
    }>()
);
