import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInputNumberMask]',
  standalone: true
})
export class InputNumberMaskDirective {

  @Input() maxDigits: number = 5;  // Allow user to pass max digits via Input

  constructor(private el: ElementRef) {}

  // Input event to handle direct input changes
  @HostListener('input', ['$event']) onInputChange(event: Event) {
    this.sanitizeInput();
  }

  // Paste event to sanitize input on paste
  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const sanitizedData = pastedData.replace(/[^0-9]/g, '').substring(0, this.maxDigits);

    const input = this.el.nativeElement as HTMLInputElement;
    input.value = sanitizedData;
    this.sanitizeInput();  // Further sanitize if needed
  }

  // Mouse wheel event to prevent scroll-based number changes
  @HostListener('wheel', ['$event']) onMouseWheel(event: WheelEvent) {
    event.preventDefault();  // Prevent input change on mouse wheel scroll
  }

  // Keydown event to prevent non-numeric input
  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    if (!this.isValidKey(event)) {
      event.preventDefault();
    }
  }

  // Sanitize input to ensure only digits and within limit
  private sanitizeInput() {
    const input = this.el.nativeElement as HTMLInputElement;
    let value = input.value;

    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Restrict the input to max digits
    if (value.length > this.maxDigits) {
      value = value.substring(0, this.maxDigits);
    }

    // Set the cleaned value back to the input field
    input.value = value;
  }

  // Utility to allow only numeric keys, backspace, delete, arrow keys, and tab
  private isValidKey(event: KeyboardEvent): boolean {
    const allowedKeys = [
      'Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete',
    ];

    const isNumberKey = /^[0-9]$/.test(event.key);  // Check if the key is a number
    return isNumberKey || allowedKeys.includes(event.key);
  }
  
}
