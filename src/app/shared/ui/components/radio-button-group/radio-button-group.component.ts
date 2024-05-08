import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { MatRadioModule } from '@angular/material/radio';

import { RadioBtnOption } from './radio-button-group.types';

const core = [
  FormsModule,
  ReactiveFormsModule,
]

const material = [
  MatRadioModule,
]

@Component({
  selector: 'scb-radio-button-group',
  standalone: true,
  imports: [
    material,
    core,
  ],
  templateUrl: './radio-button-group.component.html',
  styleUrl: './radio-button-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonGroupComponent),
      multi: true,
    }
  ]
})
export class RadioButtonGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input('options')
  public options: Array<RadioBtnOption> = [];

  public readonly control = new FormControl<string | null>(null);

  private readonly _unsubscribe$ = new Subject<void>();

  constructor() {}

  public ngOnInit(): void {}

  public onTouched: (_: string | null) => void = () => {};

  public writeValue(value: string | null): void {
    value && this.control.setValue(value);
  }

  public registerOnChange(onChange: (_: string | null) => void): void {
    this.control.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(onChange);
  }

  public registerOnTouched(fn: (_: string | null) => void): void {
    this.onTouched = fn;
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
