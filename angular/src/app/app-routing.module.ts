import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { CentyComponent } from './centy/centy.component';
import { HomeComponent } from './centy/home/home.component';
import { CategoriesComponent } from './centy/categories/categories.component';
import { AuthComponent } from './auth/auth.component';
import { LandingComponent } from './landing/landing.component';

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
