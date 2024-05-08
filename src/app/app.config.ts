import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';

import { provideEnvironmentNgxMask } from 'ngx-mask';

import { routes } from './app.routes';
import { DictionaryState } from '@store/dictionary/dictionary.state';
import { UsersState } from '@store/user/user.state';
import { FormsState } from './forms/store/forms.state';
import { MainState } from './main/store/main.state';
import { getUserProvider } from '@shared/providers';
import { TuiRootModule } from '@taiga-ui/core';
import { TuiDocMainModule } from '@taiga-ui/addon-doc';
import { applicationConfig } from '@storybook/angular';

const store = [
  DictionaryState,
  MainState,
  UsersState,
  FormsState,
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom([
      NgxsModule.forRoot(store, { developmentMode: true }),
      NgxsReduxDevtoolsPluginModule.forRoot(),
      TuiRootModule,
    ]),
    provideEnvironmentNgxMask(),
    // ATTENTION!
    // APP_INITIALIZER разрешается после инициализации стейта
    getUserProvider(),
    provideHttpClient(),
  ]
};
