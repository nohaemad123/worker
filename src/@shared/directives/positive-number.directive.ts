import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[appPositiveNumber]',
    standalone: true
  })
  export class PositiveNumberDirective {
  
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
      const input = event.target as HTMLInputElement;
      if (input?.type == 'number') {
        // Allow control keys (backspace, tab, arrow keys, delete, enter)
        if ([8, 9, 13, 37, 38, 39, 40, 46].indexOf(event.keyCode) !== -1) {
          // Handle arrow keys specifically
          if (event.keyCode === 40) { // Arrow down key
            if (parseInt(input.value) === 0) {
              event.preventDefault(); // Prevent decrement when value is 0
              return;
            }
          }
          return;
        }
  
        // Prevent non-numeric keys and 'e'/'E', '+', '-'
        if ((event.key < '0' || event.key > '9') && (event.key !== '.' || input.value.includes('.')) && (event.key === 'e' || event.key === 'E' || event.key === '+' || event.key === '-')) {
          event.preventDefault();
        }
      }
    }
  
    @HostListener('wheel', ['$event'])
    onWheel(event: WheelEvent): void {
      const input = event.target as HTMLInputElement;
      if (input?.type == 'number') {
        if (event.deltaY > 0 && parseInt(input.value) === 0) {
          event.preventDefault();
        }
      }
    }
  
    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
      const input = event.target as HTMLInputElement;
      const clipboardData = event.clipboardData;
      const pastedText = clipboardData?.getData('text') || '';
      if (input?.type == 'number') {
        // Allow pasted text to contain digits and a single decimal point
        if (!/^(\d+(\.\d{0,2})?)$/.test(pastedText)) {
          event.preventDefault();
        }
      }
    }
  
    @HostListener('input', ['$event'])
    onInput(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.handleInputChange(input);
    }
  
    @HostListener('change', ['$event'])
    onChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.handleInputChange(input);
    }
  
    @HostListener('blur', ['$event'])
    onBlur(event: Event): void {
      const input = event.target as HTMLInputElement;
      this.handleInputChange(input);
    }
  
    private handleInputChange(input: HTMLInputElement): void {
      if (input?.type == 'number') {
        // Allow digits and a single decimal point
        if (/[^0-9.]/.test(input.value)) {
          input.value = input.value.replace(/[^0-9.]/g, '');
        }
        // Ensure only one decimal point is allowed
        if (input.value.split('.').length > 2) {
          input.value = input.value.split('.').slice(0, 2).join('.');
        }
      }
    }
  }