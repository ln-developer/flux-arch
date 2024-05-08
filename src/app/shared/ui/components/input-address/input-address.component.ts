import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { BehaviorSubject, Subject, debounceTime, filter, finalize, map, takeUntil } from 'rxjs';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DaDataAddress } from '../../../utils/types/dadata.types';
import { DadataService } from '../../../utils/services/dadata.service';
import { distinctUntilObjectChanged } from '../../../utils/pipes/distinct-until-object-changed.pipe';

const core = [FormsModule, ReactiveFormsModule];

const material = [MatFormFieldModule, MatInputModule, MatAutocompleteModule];

@Component({
  selector: 'input-address',
  standalone: true,
  imports: [core, material],
  templateUrl: './input-address.component.html',
  styleUrl: './input-address.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAddressComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputAddressComponent),
      multi: true,
    },
  ],
})
export class InputAddressComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {
  @Input('label')
  public label = 'Адрес';

  private _returnObjectAddress: boolean = false;
  @Input('returnObjectAddress')
  public set returnObjectAddress(value: boolean | string) {
    this._returnObjectAddress = typeof value === 'boolean' ? value : true;
  }

  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);
  public get isLoading(): boolean {
    return this._isLoading$.getValue();
  }
  public set isLoading(isLoading: boolean) {
    this._isLoading$.next(isLoading);
  }

  private readonly _suggestions$ = new BehaviorSubject<Array<DaDataAddress>>([]);
  public get suggestions(): Array<DaDataAddress> {
    return this._suggestions$.getValue();
  }
  public set suggestions(suggestions: Array<DaDataAddress>) {
    this._suggestions$.next(suggestions);
  }

  public readonly control = new FormControl<string | null | DaDataAddress>(null);

  private readonly _unsubscribe$ = new Subject<void>();

  constructor(private readonly dadata: DadataService) {}

  public ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .pipe(debounceTime(500))
      .pipe(filter((query) => typeof query === 'string'))
      .pipe(map(query => query as string))
      .subscribe((query: string) => this._load(query));

    this.control.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .pipe(distinctUntilObjectChanged())
      .pipe(debounceTime(500))
      .pipe(filter((query) => !!query && typeof query === 'object'))
      .pipe(map(query => query as DaDataAddress))
      .subscribe((query: DaDataAddress) => this._load(query.value));
  }

  public onChange: (_: string | null | DaDataAddress) => void = (_: string | null | DaDataAddress) => {};

  public onTouched: () => void = () => {};

  public writeValue(address: string | null | DaDataAddress): void {
    if (address && typeof address === 'object')
      this.control.setValue(address.value);
    if (address && typeof address === 'string') this.control.setValue(address);

    this.control.markAsUntouched();
  }

  public registerOnChange(fn: (_: string | null | DaDataAddress) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public validate(_: AbstractControl): ValidationErrors | null {
    return this.control.errors && this.control.touched
      ? { invalid: true }
      : null;
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
    this.control.updateValueAndValidity();
  }

  public displayFn(suggestions: DaDataAddress): string {
    return suggestions && (suggestions.value ?? this.control.value);
  }

  private _load(query: string): void {
    this.isLoading = true;

    this.dadata
      .getAddress(query)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (suggestions) => {
          this.suggestions = suggestions;

          const match = suggestions.find((suggestion) => suggestion.value === query);

          if (match) {
            this.control.setValue(match);
            this._returnObjectAddress
              ? this.onChange(match)
              : this.onChange(match.value);
            this.control.markAsTouched();
          } else {
            this.control.setErrors({ notFound: true });
            this.control.markAsTouched();
            this.onChange(query);
          }
        },
        error: (_) => {
          this.suggestions = [];
        },
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
