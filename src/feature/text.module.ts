import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFontSizeDirective} from "./editFontSize/edit-font-size.directive";
import { FontStyleDirective } from './toggleFontStyles/font-style.directive';
import { FontStyleDialogComponent } from './toggleFontStyles/font-style-dialog.component';
import { ComponentResolverService } from './toggleFontStyles/component.resolver.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontStyleDialogService } from './toggleFontStyles/font-style-dialog.service';

@NgModule({
    imports: [
        CommonModule, FormsModule, ReactiveFormsModule
  ],
    declarations: [EditFontSizeDirective, FontStyleDirective, FontStyleDialogComponent],
    providers: [ComponentResolverService, FontStyleDialogService],
    exports: [EditFontSizeDirective, FontStyleDirective],
    entryComponents: [FontStyleDialogComponent]
})
export class TextModule { }
