import { OnInit, Input, Directive, Output , EventEmitter} from '@angular/core';
declare var window: any;

@Directive({
    selector: '[v-edit-font-size]'
})
export class EditFontSizeDirective implements OnInit {

    @Input("element") element: HTMLElement = null;

    @Input("minFontSize") minimumFontSize: number = 5;

    @Input("maxFontSize") maximumFontSize: number = 50;

    @Output() fontSizeIsUpdated = new EventEmitter<number>();

    ngOnInit() {

        if (this.element) {
            this.element.addEventListener('wheel', (event: WheelEvent) => {
                let fontSize: number = this.getCurrentFontSize(this.element);

                if (event.deltaY < 0 && fontSize + 1 <= this.maximumFontSize) {
                    fontSize++;
                } else if (event.deltaY > 0 && fontSize - 1 >= this.minimumFontSize) {
                    fontSize--;
                }
                this.element.style.fontSize = `${fontSize}px`;
                this.fontSizeIsUpdated.emit(fontSize);
            });
        }
    }

    private getCurrentFontSize(el: HTMLElement): number {
        let currentFontSize: string = el.style.fontSize;
        if (currentFontSize === '') {
            var computedStyles = window.getComputedStyle(el);
            currentFontSize = computedStyles.getPropertyValue('font-size');
        }

        let length = currentFontSize.length;
        let fontSize: number = +currentFontSize.substring(0, length - 2);

        return fontSize;
    }
}
