import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextModule } from '../feature/text.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, TextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
