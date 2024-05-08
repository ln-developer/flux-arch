import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { Select } from '@ngxs/store';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { FormComponentBase } from '@shared/classes';
import { InputYearComponent } from '@shared/components';
import { ToUppercaseDirective } from '@shared/directives';
import { customPatterns } from '@shared/patterns';
import { CountryDictContent } from '@shared/types';

import { DictionaryState, DictionaryStateModel } from '@store/dictionary/dictionary.state';
import { TuiAddonDocModule } from '@taiga-ui/addon-doc';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';

const core = [
  FormsModule, 
  ReactiveFormsModule,
  AsyncPipe,
  JsonPipe,
];

const material = [
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatIconModule,
  MatButtonModule,
];

const components = [
  InputYearComponent,
];

const libs = [
  NgxMaskDirective,
  NgxsFormPluginModule,
];

const utils = [
  ToUppercaseDirective,
]

const tui = [
  TuiComboBoxModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
]

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    core,
    material,
    components,
    libs,
    utils,
    // tui,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  providers: [
    provideNativeDateAdapter(),
    provideNgxMask({ validation: true }),
  ]
})
export class GroupComponent extends FormComponentBase implements OnInit {
  @Select(DictionaryState.filteredCountryList) 
  public filteredCountryList$!: Observable<Array<CountryDictContent>>;

  @Select(({ dictionary }: { dictionary: DictionaryStateModel }) => dictionary.vehicleCategory)
  public vehicleCategoryList$!: Observable<Array<string>>;

  public readonly customPatterns = customPatterns;

  public readonly minYear = new Date(1900, 0, 1);
  public readonly maxYear = new Date();

  public form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) {
    super();

    this.form = this.fb.group({
      testAutocomplete: [null, { validators: [Validators.required], updateOn: 'change' }],
      testSelect: [null, [Validators.required]],
      testMaskedInput: [null],
      testInputYear: [null, [Validators.required]],
    }, 
    { 
      // стейт будет обновляться только после события blur у контрола
      updateOn: 'submit',
    });
  }

  public ngOnInit(): void {}

  public displayWith(option: CountryDictContent): string {
    return option && (option.name ?? '');
  }

  public onSubmit(): void {
    console.log('SUBMIT');
  }
}
