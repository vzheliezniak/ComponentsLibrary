import { Component, OnInit, ElementRef } from '@angular/core';
declare var window: any;

@Component({
  selector: 'v-in-font-size',
  template: `
    <button type="button" (click)="increase()">+</button>
  `,increase
  styleUrls: ['./font-size.component.css']
})
export class IncreaseFontSizeComponent implements OnInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit() {

  }

  public increase(): void {
    let currentFontSize: string = this.elRef.nativeElement.parentElement.style.fontSize;
    if (currentFontSize === '') {
      var computedStyles = window.getComputedStyle(this.elRef.nativeElement.parentElement);
      currentFontSize = computedStyles.getPropertyValue('font-size');
    }
    
    let length = currentFontSize.length;
    let fontSize: number = +currentFontSize.substring(0, length - 2);
    fontSize++;
    this.elRef.nativeElement.parentElement.style.fontSize = `${fontSize}px`;
  }

}
