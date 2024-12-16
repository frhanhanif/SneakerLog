import { Directive, HostListener, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[priceFormat]',
  standalone: true
})
export class PriceFormatDirective implements ControlValueAccessor {
  private onChange!: (value: any) => void;
  private onTouched!: () => void;

  constructor(private el: ElementRef) {}

  // Handles input event (adds commas while typing)
  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const numericValue = value.replace(/,/g, '');
    const formattedValue = this.formatPrice(numericValue);

    this.el.nativeElement.value = formattedValue; // Update input display
    if (this.onChange) {
      this.onChange(numericValue ? parseFloat(numericValue) : 0); // Update model
    }
  }

  // Handles blur event (formats the final value)
  @HostListener('blur')
  onBlur(): void {
    const value = this.el.nativeElement.value.replace(/,/g, '');
    this.el.nativeElement.value = this.formatPrice(value);
    if (this.onTouched) {
      this.onTouched();
    }
  }

  // Helper function to format price
  private formatPrice(value: string | number): string {
    if (!value) return '';
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    return numericValue.toLocaleString('en-US');
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    const formattedValue = this.formatPrice(value || '');
    this.el.nativeElement.value = formattedValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}