import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { categoriesReducer } from './categories.reducer';
import { CategoriesEffects } from './categories.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('categoriesState', categoriesReducer),
    EffectsModule.forFeature([CategoriesEffects])
  ]
})
export class CategoriesStoreModule {} 