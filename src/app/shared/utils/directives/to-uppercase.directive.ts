import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[toUppercase]',
  standalone: true,
})
export class ToUppercaseDirective {
  constructor(public ref: ElementRef, private readonly renderer: Renderer2) {}

  @HostListener('input', ['$event'])
  transformToUppercase(): void {    
    const inputValue = this.ref.nativeElement.value;
    this.renderer.setProperty(this.ref.nativeElement, 'value', inputValue.toUpperCase());
  }
}
