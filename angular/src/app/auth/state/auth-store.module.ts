import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './auth.reducer';
import { AuthEffects } from './auth.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('authState', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthStoreModule {} 