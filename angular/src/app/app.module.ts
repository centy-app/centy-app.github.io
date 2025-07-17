import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';

import { categoriesReducer } from './centy/categories/state/categories.reducer';
import { CategoriesEffects } from './centy/categories/state/categories.effects';
import { CurrenciesStoreModule } from './centy/currencies/state/currencies-store.module';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './base/landing-base.component';
import { CentyComponent } from './base/centy-base.component';
import { AuthInterceptor } from 'src/infrastructure/auth-interceptor';
import { DeleteConfirmationDialogModule } from './centy/categories/delete-confirmation-dialog/delete-confirmation-dialog.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthStoreModule } from './auth/state/auth-store.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({ declarations: [
        AppComponent,
        AuthComponent,
        CentyComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AuthStoreModule,
        StoreModule.forRoot({ categoriesState: categoriesReducer }),
        EffectsModule.forRoot([CategoriesEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        DeleteConfirmationDialogModule,
        CurrenciesStoreModule
    ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
