import { Directive, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { FormComponentBase } from './form-component-base.class';

@Directive()
export abstract class CustomControlBase<T> extends FormComponentBase implements ControlValueAccessor, Validator, OnDestroy {

  private readonly _unsubscribe$ = new Subject<void>();

  public writeValue(value: T): void {
    value && this.form.setValue(value, { emitEvent: false });
  }

  public onTouched: (_: T) => void = () => {};

  public registerOnChange(onChange: (_: T) => void): void {
    this.form.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(onChange);
  }

  public registerOnTouched(fn: (_: T) => void): void {    
    this.onTouched = fn;
  }

  public validate(_: AbstractControl): ValidationErrors | null {
    return this.form.invalid ? { invalid: true } : null;
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();    
  }
}
