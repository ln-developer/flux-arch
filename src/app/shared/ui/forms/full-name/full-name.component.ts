import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CustomControlBase } from '@shared/classes';
import { InputDateComponent } from '@shared/components';
import { FirstCapitalLetterDirective } from '@shared/directives';

import { FullNameModel } from './utils';

const material = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
]

const components = [
  InputDateComponent,
]

const utils = [
  FirstCapitalLetterDirective,
]

const core = [
  FormsModule,
  ReactiveFormsModule,
]

@Component({
  selector: 'full-name',
  standalone: true,
  imports: [
    material,
    utils,
    core,
    components,
  ],
  templateUrl: './full-name.component.html',
  styleUrl: './full-name.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FullNameComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FullNameComponent),
      multi: true,
    },
  ]
})
export class FullNameComponent extends CustomControlBase<FullNameModel> implements OnInit  {
  public override form: FormGroup<FormType<FullNameModel>>;

  constructor(
    private readonly fb: FormBuilder,
  ) {
    super();

    this.form = this.fb.group({
      lastName: this.fb.control<string | null>(null, [Validators.required]),
      firstName: this.fb.control<string | null>(null, [Validators.required]),
      middleName: this.fb.control<string | null>(null),
    })
  }

  public ngOnInit(): void {}
}
