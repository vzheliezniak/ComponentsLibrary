import { OnInit, ElementRef, Input, Directive } from '@angular/core';
declare var window: any;

@Directive({
    selector: '[v-edit-font-size]'
})
export class EditFontSizeDirective implements OnInit {

    private currentElement: HTMLElement = null;

    @Input("minFontSize") minimumFontSize: number = 5;

    @Input("maxFontSize") maximumFontSize: number = 50;

    constructor(private elRef: ElementRef) { }

    ngOnInit() {
        this.currentElement = this.elRef.nativeElement.parentElement;

        this.currentElement.addEventListener('wheel', (event: WheelEvent) => {
            let fontSize: number = this.getCurrentFontSize(this.currentElement);

            if (event.deltaY < 0 && fontSize + 1 <= this.maximumFontSize) {
                fontSize++;
            } else if (event.deltaY > 0 && fontSize - 1 >= this.minimumFontSize) {
                fontSize--;
            }
            this.currentElement.style.fontSize = `${fontSize}px`;
        });
    }

    private getCurrentFontSize(el: HTMLElement): number {
        let currentFontSize: string = this.elRef.nativeElement.parentElement.style.fontSize;
        if (currentFontSize === '') {
            var computedStyles = window.getComputedStyle(this.elRef.nativeElement.parentElement);
            currentFontSize = computedStyles.getPropertyValue('font-size');
        }

        let length = currentFontSize.length;
        let fontSize: number = +currentFontSize.substring(0, length - 2);

        return fontSize;
    }
}
