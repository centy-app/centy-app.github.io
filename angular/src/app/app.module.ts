import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CentyComponent } from './centy/centy.component';
import { HomeComponent } from './centy/home/home.component';
import { CategoriesComponent } from './centy/categories/categories.component';
import { TransactionComponent } from './centy/transaction/transaction.component';
import { ReportsComponent } from './centy/reports/reports.component';
import { BalanceComponent } from './centy/reports/balance/balance.component';
import { ExpensesComponent } from './centy/reports/expenses/expenses.component';

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
    ExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
