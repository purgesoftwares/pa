import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { FeedbackComponent } from './feedback.component';
import {RatingModule} from "ng2-rating";

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule, RatingModule],
    declarations: [FeedbackComponent ],
    exports: [FeedbackComponent]
})

export class FeedbackModule { }
