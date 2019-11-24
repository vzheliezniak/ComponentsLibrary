import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditFontSizeDirective} from "./edit-font-size.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EditFontSizeDirective],
  providers: [],
  exports: [EditFontSizeDirective]
})
export class TextModule { }
