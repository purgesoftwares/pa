import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './location.component';
import { AgmCoreModule } from "angular2-google-maps/core";


@NgModule({
    imports: [RouterModule, BrowserModule, FormsModule, ReactiveFormsModule, AgmCoreModule.forRoot({
          apiKey: "AIzaSyAGMdOZPvWC-k__DNkAk9aGkPZ8x7OIGeY",
          libraries: ["places"]
        })],
    declarations: [LocationComponent ],
    exports: [LocationComponent]
})

export class LocationModule { }
