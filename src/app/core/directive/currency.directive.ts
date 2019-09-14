import { Directive, OnInit, ElementRef, Input,Output, AfterViewInit, SimpleChanges, HostListener, OnChanges, AfterViewChecked, AfterContentChecked, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';

declare var $:any
@Directive({
  selector: '[formControlName][currency]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)':'onInputChange($event.target.value, true)'
  }
})
export class CurrencyDirective implements OnInit,AfterViewInit, AfterContentChecked{
  @Output() rawChange:EventEmitter<string> = new EventEmitter<string>();
  constructor(private el: ElementRef,
    public model: NgControl,
    ) { }
  ngAfterViewInit() {
  
  }
ngOnInit() {
}
ngAfterContentChecked() {
  
}
onInputChange(event: any, backspace: any) {
  if(event) {
    var numeral = require('numeral');
    let newVal = numeral(event).format('0,0');
    // // var myNumeral2 = numeral(newVal);
    // // var value2 = myNumeral2.value();
    var rawValue = newVal;
      this.model.valueAccessor.writeValue(newVal);
      this.rawChange.emit(rawValue)
  }
  
}
}
