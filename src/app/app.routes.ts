import { Routes } from '@angular/router';

import { MainComponent } from './main/main.component';
import { FormsComponent } from './forms/forms.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
    },
    {
        path: 'forms',
        component: FormsComponent,
    }
];
