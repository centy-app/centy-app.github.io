import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentyComponent } from './base/centy-base.component';
import { AuthComponent } from './base/landing-base.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', loadComponent: () => import('./landing/landing.component').then(c => c.LandingComponent) },
      { path: 'register', loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent) },
      { path: 'login', loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent) },
    ]
  },
  {
    path: 'centy',
    component: CentyComponent,
    children: [
      { path: '', loadComponent: () => import('./centy/home/home.component').then(c => c.HomeComponent) },
      { path: 'categories', loadComponent: () => import('./centy/categories/categories.component').then(c => c.CategoriesComponent) },
      { path: 'balance', loadComponent: () => import('./centy/reports/balance/balance.component').then(c => c.BalanceComponent) },
      { path: 'expenses', loadComponent: () => import('./centy/reports/expenses/expenses.component').then(c => c.ExpensesComponent) },
      { path: 'settings', loadComponent: () => import('./centy/settings/settings.component').then(c => c.SettingsComponent) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
