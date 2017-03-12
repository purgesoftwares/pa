import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ProviderProfileComponent } from './profile.component';
import { AgmCoreModule } from "angular2-google-maps/core";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';


@NgModule({
    imports: [RouterModule, BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, AgmCoreModule.forRoot({
          apiKey: "AIzaSyAGMdOZPvWC-k__DNkAk9aGkPZ8x7OIGeY",
          libraries: ["places"]
        })],
    declarations: [ProviderProfileComponent ],
    exports: [ProviderProfileComponent]
})

export class ProviderProfileModule { }
