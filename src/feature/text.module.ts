import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseFontSizeComponent} from "./increase-font-size.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IncreaseFontSizeComponent],
  providers: [],
  exports: [IncreaseFontSizeComponent]
})
export class TextModule { }
