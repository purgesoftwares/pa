import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { ThankYouComponent } from './thank-you.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [ThankYouComponent ],
    exports: [ThankYouComponent]
})

export class ThankYouModule { }
