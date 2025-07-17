import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { currenciesReducer } from './centy/currencies/state/currencies.reducer';
import { CurrenciesEffects } from './centy/currencies/state/currencies.effects';
import { categoriesReducer } from './centy/categories/state/categories.reducer';
import { CategoriesEffects } from './centy/categories/state/categories.effects';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './base/landing-base.component';
import { CentyComponent } from './base/centy-base.component';
import { AuthInterceptor } from 'src/infrastructure/auth-interceptor';
import { DeleteConfirmationDialogModule } from './centy/categories/delete-confirmation-dialog/delete-confirmation-dialog.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './auth/state/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/state/auth.effects';

@NgModule({ declarations: [
        AppComponent,
        AuthComponent,
        CentyComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgxsModule.forRoot([
            // CategoriesState removed (now using NgRx)
        ], {
            developmentMode: !environment.production
        }),
        StoreModule.forRoot({ authState: authReducer, currenciesState: currenciesReducer, categoriesState: categoriesReducer }),
        EffectsModule.forRoot([AuthEffects, CurrenciesEffects, CategoriesEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        DeleteConfirmationDialogModule
    ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
