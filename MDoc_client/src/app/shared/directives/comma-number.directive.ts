import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[commaNumber]',
  standalone: true
})
export class CommaNumberDirective {


  constructor(private el: ElementRef) {
  }

  @HostListener('input') onChange() {
    const value = this.el.nativeElement.value.replace(',', '');
    this.el.nativeElement.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
 

}
