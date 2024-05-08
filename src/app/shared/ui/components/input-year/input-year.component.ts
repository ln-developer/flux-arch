import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { TuiInputYearModule } from '@taiga-ui/kit';

const core = [
  FormsModule,
  ReactiveFormsModule,
]

const material = [
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule,
]

const tui = [
  TuiInputYearModule,
]

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
  },
};

@Component({
  selector: 'input-year',
  standalone: true,
  imports: [
    material,
    core,
    tui,
  ],
  templateUrl: './input-year.component.html',
  styleUrl: './input-year.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputYearComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputYearComponent),
      multi: true,
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [ MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS ],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class InputYearComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  @Input('label')
  public label: string = 'Год';

  @Input('placeholder')
  public placeholder: string = 'ГГГГ';

  @Input('min')
  public minYear?: Date;

  @Input('max')
  public maxYear?: Date;

  public readonly control = new FormControl<Date | null>(null);

  private readonly _unsubscribe$ = new Subject<void>();

  constructor() {}

  public ngOnInit(): void {}

  public onTouched: (_: Date | null) => void = () => {};

  public writeValue(value: Date | null): void {
    value && this.control.setValue(value);
  }

  public registerOnChange(onChange: (_: Date | null) => void): void {
    this.control.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(onChange);
  }

  public registerOnTouched(fn: (_: Date | null) => void): void {
    this.onTouched = fn;
  }

  public validate(external: AbstractControl): ValidationErrors | null {    
    return this.control.invalid || external.invalid ? { invalid: true } : null;
  }

  public chosenYearHandler(
    chosenYear: Date, //
    datepicker: MatDatepicker<Date> // ссылка на дейтпикер
  ) {
    this.control.setValue(chosenYear);
    datepicker.close();
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
