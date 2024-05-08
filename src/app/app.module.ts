import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { provideEnvironmentNgxMask } from 'ngx-mask';

import { TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { TuiMobileCalendarDialogModule } from '@taiga-ui/addon-mobile';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { DictionaryState } from './store/dictionary/dictionary.state';
import { HeaderComponent } from './shared/ui/layout/header/header.component';
import { SidenavComponent } from './shared/ui/layout/sidenav/sidenav.component';
import { MainState } from './main/store/main.state';
import { UsersState } from './store/user/user.state';
import { getUserProvider } from './shared/utils/providers/get-user.provider';
import { FormsState } from './forms/store/forms.state';

const store = [
  DictionaryState,
  MainState,
  UsersState,
  FormsState,
]

const layout = [
  HeaderComponent,
  SidenavComponent,
]

const tui = [
  TuiRootModule,
  TuiDialogModule,
  TuiMobileCalendarDialogModule,
]

@NgModule({
  // declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot(store, { developmentMode: true }),
    CommonModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsFormPluginModule.forRoot(),
    layout,
    tui,
  ],
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    // ATTENTION!
    // APP_INITIALIZER разрешается после инициализации стейта
    getUserProvider(),
  ],
  // bootstrap: [AppComponent],
})
export class AppModule {}
