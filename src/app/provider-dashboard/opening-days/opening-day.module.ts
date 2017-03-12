import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { OpeningDayComponent } from './opening-day.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


@NgModule({
    imports: [RouterModule, BrowserModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [OpeningDayComponent ],
    exports: [OpeningDayComponent]
})

export class OpeningDayModule { }
