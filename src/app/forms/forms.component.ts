import { AsyncPipe } from '@angular/common';
import { Component, Inject, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

import { Select } from '@ngxs/store';

import { dictInitializingProvider } from '@shared/providers';
import { DICT_INITIALIZE, DICT_LIST } from '@shared/tokens';
import { DICTIONARY } from '@shared/consts';

import { GroupComponent, NestedComponent } from './ui';
import { FormsState } from './store/forms.state';
import { TuiAddonDocModule, TuiDocExample } from '@taiga-ui/addon-doc';

const material = [
  MatTabsModule,
  MatButtonModule,
  MatCardModule,
];

const components = [
  GroupComponent,
  NestedComponent,
];

const core = [
  FormsModule,
  ReactiveFormsModule,
  AsyncPipe,
]

const tui = [
  TuiAddonDocModule,
]

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    material,
    components,
    core,
    tui,
  ],
  providers: [
    {
      provide: DICT_LIST,
      useValue: [
        DICTIONARY.COUNTRY,
        DICTIONARY.PLACE_OF_REGISTRACTION,
        DICTIONARY.VEHICLE_CATEGORY,
        DICTIONARY.VEHICLE_DOC_TYPE,
        DICTIONARY.VEHICLE_PURPOSE,
      ],
    },
    dictInitializingProvider(),
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {

  @Select(FormsState.isFormValid)
  public isFormValid$!: Observable<(step: number) => boolean>;
  
  public readonly FOREIGN_COUNTRY_KEY = 3;

  public selectedTab: number = 0;

  constructor(@Inject(DICT_INITIALIZE) readonly dictInit$: Observable<boolean>) {}
}
