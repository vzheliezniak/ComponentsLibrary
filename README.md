# ComponentsLibrary

This library is created to provide ready components for text editing in browser. 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Installation 

run `npm install text-components-library` to install components. 

## Usage 

To start using library, import TextModule to your module. 

import { TextModule } from 'text-components-library';

@NgModule({
  imports: [.. TextModule, ..]
})

`v-edit-font-size` directive allows user to increase or decrease the size of a font by scrollint mounse whell up and dows. 

Add v-edit-font-size directive to component, which needs possibility to edit size of a font. Input property `[element]` is an ElementRef of component. Subscribe to `(fontSizeIsUpdated)` event, if it is needed to react on font size change event. Output of event is a value of a new font size. Maximum and minimum values can be provided to control size of a font. For that aim, add `[minFontSize]` or `[maxFontSize]` input properties to directive usage. 

Example of usage: 

```
<div>
  <p v-edit-font-size [element]="element" (fontSizeIsUpdated)="fontHasChanges($event)"
     [minFontSize]="10" [maxFontSize]="30"
     > Test text </p>
</div> 
```

`v-font-styles` directive is a dialog, which has several styling options for the text. The dialog is opened by clicking right mouse buttong. 

Add v-font-styles directive right to element, which needs to be edited. Subsribe to `(stylesHasBeenUpdated)` event to react on changes in style. The output for this event is a FontStyleModel. 

```
export class FontStyleModel {
    styleOptions: Array<string>;
    textDecoration: string;
    fontFamily: string;

    constructor(styleOptions: Array<string>, textDecoration: string, fontFamily: string) {
        this.styleOptions = styleOptions;
        this.textDecoration = textDecoration;
        this.fontFamily = fontFamily;
    }
}
```

Supported values:
* style options: italic, bold, normal;
* textDecoration: none, overline, underline, line-through;
* fontFamily: serif, sans-serif, monospace, cursive, fantasy, system-ui. 

Initial values of styles can be populated using `[fontSettings]` input property. 
