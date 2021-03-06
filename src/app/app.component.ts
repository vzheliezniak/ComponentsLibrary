import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    public element: HTMLElement = null;
    title = 'ComponentsLibrary';

    constructor(private elRef: ElementRef) {
        this.element = elRef.nativeElement;
    }

    public fontHasChanges(event: number): void {
        console.log(event);
    }


}
