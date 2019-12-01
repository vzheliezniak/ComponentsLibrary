import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { FontStyleDialogService } from './font-style-dialog.service';
import { Subscription } from 'rxjs';
import { FontStyleModel } from './font-style.model';

@Component({
    selector: 'context-dialog',
    templateUrl: './font-style-dialog.component.html',
    styleUrls: ['./font-style-dialog.component.css']
})
export class FontStyleDialogComponent implements OnInit, OnDestroy {
    public elementForStyling: HTMLElement = null;
    public form: FormGroup;
    public isTextDecorationDropdownShown: boolean = false;
    public isFontFamilyOptionShown: boolean = false;
    public initialFontSettings: FontStyleModel = null;

    private subscription: Subscription;

    styleOptions = [
        { id: 1, name: 'Italic' },
        { id: 2, name: 'Bold' }
    ];

    textDecorations = [
        { id: 1, name: 'None', styleValue: "none" },
        { id: 2, name: 'Underline', styleValue: "underline" },
        { id: 3, name: 'Overline', styleValue: "overline" },
        { id: 4, name: 'Crossline', styleValue: "line-through"}
    ];

    fontFamilyOption = [
        { id: 1, name: "Serif", font: "serif" },
        { id: 2, name: "Sans-serif", font: "sans-serif" },
        { id: 3, name: "Monospace", font: "monospace" },
        { id: 4, name: "Cursive", font: "cursive" },
        { id: 5, name: "Fantasy", font: "fantasy" },
        { id: 6, name: "System-ui", font: "system-ui" }
    ];

    constructor(private formBuilder: FormBuilder, private dialogService: FontStyleDialogService) {

        console.log("constructor of componenet");

        this.form = this.formBuilder.group({
            styleOptions: new FormArray([]),
            textDecorations: [''],
            fontFamilyOption: ['']
        });

        this.populateOnFormInitialFontSettings(this.initialFontSettings);
    }

    ngOnInit(): void {
        this.subscription = this.form.valueChanges.subscribe((change) => {

            this.elementForStyling.style.fontStyle = change.styleOptions[0] === true ? "italic" : "normal";
            this.elementForStyling.style.fontWeight = change.styleOptions[1] === true ? "bold" : "normal";
            this.elementForStyling.style.textDecoration = this.textDecorations[change.textDecorations - 1].styleValue;
            this.elementForStyling.style.fontFamily = this.fontFamilyOption[change.fontFamilyOption - 1].font;

            this.updateFontSettings(this.elementForStyling.style.fontStyle, this.elementForStyling.style.fontWeight,
                this.elementForStyling.style.textDecoration, this.elementForStyling.style.fontFamily);          

        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private addCheckboxes(selectedSettings: Array<number>): void {
        this.styleOptions.forEach((o, i) => {
            const control = new FormControl(selectedSettings.includes(i)); 
            (this.form.controls.styleOptions as FormArray).push(control);
        });
    }

    private populateOnFormInitialFontSettings(fontSettings: FontStyleModel): void {
        let emptyStyleOptions: Array<number> = new Array<number>();

        if (fontSettings) {
             // initialize style options eg. Italic, Bold, if any provided. 
            if (fontSettings.styleOptions) {               
                let selectedOptions: Array<number> = new Array<number>();
                fontSettings.styleOptions.forEach((item) => {
                    let option = this.styleOptions.findIndex(el => el.name === item);
                    selectedOptions.push(option);
                });

                this.addCheckboxes(selectedOptions);
            } else {
                this.addCheckboxes(emptyStyleOptions);
            }

            // initialize text decoration
            if (fontSettings.textDecoration !== "") {
                let selectedTextDecoration: number = this.textDecorations.findIndex(el => el.name === fontSettings.textDecoration);
                this.form.controls.textDecorations.patchValue(selectedTextDecoration);
            } else {
                this.form.controls.textDecorations.patchValue(this.textDecorations[0].id);
            }

            // initialize font family
            if (fontSettings.fontFamily !== "") {
                let selectedFontFamily: number = this.fontFamilyOption.findIndex(el => el.name === fontSettings.fontFamily);
                this.form.controls.textDecorations.patchValue(selectedFontFamily);
            } else {
                this.form.controls.fontFamilyOption.patchValue(this.fontFamilyOption[0].id);
            }

        } else {
            // initialize default /empty values
            this.addCheckboxes(emptyStyleOptions);
            this.form.controls.textDecorations.patchValue(this.textDecorations[0].id);
            this.form.controls.fontFamilyOption.patchValue(this.fontFamilyOption[0].id);
        }       
    }

    private updateFontSettings(fontStyle: string, fontWeight: string, textDecoration: string, fontFamily: string): void {
        let fontStyleOptions: Array<string> = new Array<string>();
        const defaultStyleOption: string = "normal";
        if (fontStyle !== defaultStyleOption) {
            fontStyleOptions.push("Italic");
        }
        if (fontWeight !== defaultStyleOption) {
            fontStyleOptions.push("Bold");
        }

        let selectedTextDecoration = this.textDecorations.find(el => el.styleValue === textDecoration).name;
        let selectedFontFamily = this.fontFamilyOption.find(el => el.font === fontFamily).name;

        let updatedStyle: FontStyleModel = new FontStyleModel(fontStyleOptions, selectedTextDecoration, selectedFontFamily);
        this.dialogService.updateFontSettings(updatedStyle);
    }

    public toggleTextDecoration(): void {
        this.isTextDecorationDropdownShown = !this.isTextDecorationDropdownShown;
        console.log(this.isTextDecorationDropdownShown);
    }

    public toggleFontOptions(): void {
        this.isFontFamilyOptionShown = !this.isFontFamilyOptionShown;
    }

    public close(): void {
        this.dialogService.closeDialog();
    }

}
