import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, FormsModule, ReactiveFormsModule, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

import { TuiInputDateModule } from '@taiga-ui/kit';

import { MaskitoOptions } from '@maskito/core';
import { MaskitoDirective } from '@maskito/angular';
import { maskitoDateOptionsGenerator } from '@maskito/kit';

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
  TuiInputDateModule,
]

const maskito = [
  MaskitoDirective,
]

@Component({
  selector: 'input-date',
  standalone: true,
  imports: [
    core,
    material,
    tui,
    maskito,
  ],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
    provideNativeDateAdapter(),
  ]
})
export class InputDateComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  @Input('label')
  public label: string = 'Год';

  @Input('placeholder')
  public placeholder: string = 'ДД.ММ.ГГГГ';

  @Input('min')
  public minDate?: Date;

  @Input('max')
  public maxDate?: Date;

  public readonly maskitoOptions: MaskitoOptions = maskitoDateOptionsGenerator({mode: 'dd/mm/yyyy', separator: '.'});

  public readonly control = new FormControl<Date | null>(null);

  private readonly _unsubscribe$ = new Subject<void>();

  constructor() {}

  // TODO
  // добавить маску типа дд.мм.гггг

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

  public validate(_: AbstractControl): ValidationErrors | null {
    return this.control.invalid ? { invalid: true } : null;
  }

  public chosenYearHandler(chosenYear: Date, datepicker: MatDatepicker<Date>) {
    this.control.setValue(chosenYear);
    datepicker.close();
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
