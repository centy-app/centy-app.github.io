import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environment/environment';

import { AppComponent } from './app.component';
import { AuthComponent } from './base/landing-base.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CentyComponent } from './base/centy-base.component';
import { HomeComponent } from './centy/home/home.component';
import { CategoriesComponent } from './centy/categories/categories.component';
import { TransactionComponent } from './centy/transaction/transaction.component';
import { ReportsComponent } from './centy/reports/reports.component';
import { BalanceComponent } from './centy/reports/balance/balance.component';
import { ExpensesComponent } from './centy/reports/expenses/expenses.component';
import { SettingsComponent } from './centy/settings/settings.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { currenciesReducers } from './centy/currencies/state/currencies.reducers';
import { CurrenciesEffects } from './centy/currencies/state/currencies.effects';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    CentyComponent,
    HomeComponent,
    CategoriesComponent,
    TransactionComponent,
    ReportsComponent,
    BalanceComponent,
    ExpensesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({
      currencies: currenciesReducers
    }),
    EffectsModule.forRoot([CurrenciesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
