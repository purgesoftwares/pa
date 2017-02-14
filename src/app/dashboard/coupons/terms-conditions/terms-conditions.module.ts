import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { TermConditionComponent } from './terms-conditions.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [TermConditionComponent ],
    exports: [TermConditionComponent]
})

export class TermConditionModule { }
