import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { currenciesReducer } from './currencies.reducer';
import { CurrenciesEffects } from './currencies.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('currenciesState', currenciesReducer),
    EffectsModule.forFeature([CurrenciesEffects])
  ]
})
export class CurrenciesStoreModule {} 