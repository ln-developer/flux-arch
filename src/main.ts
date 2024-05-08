import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';

import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// platformBrowser()
//   .bootstrapModule(AppModule)
//   .catch((e) => console.error(e));

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
