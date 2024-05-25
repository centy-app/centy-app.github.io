import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/material.module';

import { NgxsModule, NGXS_PLUGINS } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { authStoragePlugin } from 'src/state/state-plugins';
import { CurrenciesState } from './centy/currencies/state/currencies.state';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './base/landing-base.component';
import { CentyComponent } from './base/centy-base.component';
import { AuthState } from './auth/state/auth.state';

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
    NgxsModule.forRoot([AuthState, CurrenciesState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    {
      provide: NGXS_PLUGINS,
      useValue: authStoragePlugin,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
