import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CentyComponent } from './base/centy-base.component';
import { HomeComponent } from './centy/home/home.component';
import { CategoriesComponent } from './centy/categories/categories.component';
import { AuthComponent } from './base/landing-base.component';
import { LandingComponent } from './landing/landing.component';
import { BalanceComponent } from './centy/reports/balance/balance.component';
import { ExpensesComponent } from './centy/reports/expenses/expenses.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'centy',
    component: CentyComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'expenses', component: ExpensesComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
