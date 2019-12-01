import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core'
import { FontStyleDialogComponent } from './font-style-dialog.component';
import { FontStyleModel } from './font-style.model';

@Injectable()
export class DialogResolverService {
    private rootViewContainer!: ViewContainerRef;
    private nativeElement: HTMLElement = null;

    constructor(private factoryResolver: ComponentFactoryResolver) {
    }

    public setRootViewContainerRef(viewContainerRef: ViewContainerRef): void {
        this.rootViewContainer = viewContainerRef;
        this.nativeElement = viewContainerRef.element.nativeElement;
    }

    public addDynamicComponent(fontSettings: FontStyleModel): void {
        const factory = this.factoryResolver.resolveComponentFactory(FontStyleDialogComponent);
        const component = factory.create(this.rootViewContainer.parentInjector);
        component.instance.elementForStyling = this.nativeElement;
        component.instance.initialFontSettings = fontSettings;
        console.log("adding component to host", this.rootViewContainer.element.nativeElement);
        this.rootViewContainer.insert(component.hostView);
    }

    public removeComponentFromView(): void {
        if (this.rootViewContainer)
            this.rootViewContainer.clear();
    }
}
