import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { RadioButtonGroupComponent, InputAddressComponent, InputDateComponent } from '@shared/components';
import { NestedFormModel } from './utils';

import { FormComponentBase } from '@shared/classes';
import { GenderOptions, GENDER } from '@shared/consts';
import { DaDataAddress } from '@shared/types';
import { FullNameComponent, FullNameModel } from '@shared/forms';

const core = [
  FormsModule, 
  ReactiveFormsModule
];

const material = [
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatAutocompleteModule
];

const components = [
  RadioButtonGroupComponent,
  FullNameComponent,
  InputAddressComponent,
  InputDateComponent,
]

const libs = [
  NgxsFormPluginModule,
]

@Component({
  selector: 'app-nested',
  standalone: true,
  imports: [
    core,
    material,
    components,
    libs,
  ],
  templateUrl: './nested.component.html',
  styleUrl: './nested.component.scss'
})
export class NestedComponent extends FormComponentBase implements OnInit {
  public readonly genderOptions = GenderOptions;

  public readonly today = new Date();

  public override form: FormGroup<FormType<NestedFormModel>>;

  constructor(
    private readonly fb: FormBuilder,
  ) {
    super();

    this.form = this.fb.group({
      gender: this.fb.control<GENDER | null>(GENDER.FEMALE, [Validators.required]),
      fullName: this.fb.control<FullNameModel | null>(null),
      birthDate: this.fb.control<Date | null>(null, [Validators.required]),
      address: this.fb.control<DaDataAddress | null>(null, [Validators.required]),
    })
  }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe(() => console.log(this.form))
  }
}
