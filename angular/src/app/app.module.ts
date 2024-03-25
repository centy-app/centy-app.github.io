import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { currenciesReducers } from './centy/currencies/state/currencies.reducers';
import { authReducers } from './auth/state/auth.reducers';
import { metaReducers } from 'src/state/meta-reducers';
import { CurrenciesEffects } from './centy/currencies/state/currencies.effects';

import { AppComponent } from './app.component';
import { AuthComponent } from './base/landing-base.component';
import { CentyComponent } from './base/centy-base.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CentyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({
      currenciesState: currenciesReducers,
      authState: authReducers
    }, { metaReducers }),
    EffectsModule.forRoot([CurrenciesEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 , connectInZone: true}) : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
