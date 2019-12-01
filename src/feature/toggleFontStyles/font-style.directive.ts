import { OnInit, Input, Directive, Output, EventEmitter, ViewContainerRef, OnDestroy } from '@angular/core';
import { DialogResolverService } from './dialog-resolver.service';
import { FontStyleDialogService } from './font-style-dialog.service';
//import { Subscription } from 'rxjs';
import { FontStyleModel } from './font-style.model';

@Directive({
    selector: '[v-font-styles]'
})
export class FontStyleDirective implements OnInit, OnDestroy {

    @Input("element") element: HTMLElement = null;
    @Input("fontSettings") initialFonstStyleSettings: FontStyleModel = null;

    @Output() stylesHasBeenUpdated = new EventEmitter<FontStyleModel>();

    //private subscription: Array<Subscription> = new Array < Subscription>();
    private isDialogAlreadyOpen: boolean = false;

    constructor(private comp: DialogResolverService, public container: ViewContainerRef, private dialogService: FontStyleDialogService) {
    }

    ngOnInit() {
        console.log("instantiate directive");
        if (this.element) {
            this.element.addEventListener("contextmenu", (event: MouseEvent) => {
                event.preventDefault();
                event.stopPropagation();
                if (!this.isDialogAlreadyOpen) {
                    console.log("call to add component");
                    this.comp.setRootViewContainerRef(this.container);
                    this.comp.addDynamicComponent(this.initialFonstStyleSettings);
                    this.isDialogAlreadyOpen = true;
                }
            });
        }

        this.dialogService.shouldCloseDialogAsObservable
            .subscribe((value) => {
                if (value) {
                    this.comp.removeComponentFromView();
                    this.isDialogAlreadyOpen = false;
                }
            });

        this.dialogService.updatedFontSettingsAsObservable
            .subscribe((value) => {
                this.stylesHasBeenUpdated.emit(value);
            });

        //this.subscription.push();

        //this.subscription.push();
    }

    ngOnDestroy(): void {
        //this.subscription.forEach(el => el.unsubscribe());
    }
}
