import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {NoticeModule} from '../../projects/notice/src/public_api';
// import {NoticeModule} from '../../dist/notice';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoticeModule.withConfig({
      global: {
        newOnTop: true,
        maxAtPosition: 6,
        maxOnScreen: 8,
        filterDuplicates: false
      },
      toast: {
        type: 'info'
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
