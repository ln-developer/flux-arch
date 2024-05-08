import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[firstCapitalLetter]',
  standalone: true,
})
export class FirstCapitalLetterDirective {
  constructor(public ref: ElementRef, private readonly control: NgControl) {}

  @HostListener('input', ['$event'])
  transformToUppercase(): void {
    const inputEl = this.ref.nativeElement.value;
    this.control.control?.setValue(
      inputEl.substring(0, 1).toUpperCase() + inputEl.substring(1).toLowerCase()
    );
  }
}
