import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTrimValue]'
})
export class TrimValueDirective {

  constructor(
    private ngControl: NgControl
  ) { }

  get control() {
    return this.ngControl.control;
  }

  @HostListener('keydown')
  onkeydown() {
    if (this.control && typeof this.control.value === 'string' && this.control.value.trim().length === 0) {
      this.control.setValue(this.control.value.trim());
    }
  }

  @HostListener('blur')
  onBlur() {
    if (this.control && typeof this.control.value === 'string') {
      this.control.setValue(this.control.value.trim());
    }
  }
}
