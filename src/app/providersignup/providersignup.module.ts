import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProviderSignupComponent } from './providersignup.component';
import { AgmCoreModule } from "angular2-google-maps/core";

@NgModule({
    imports: [RouterModule, CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, AgmCoreModule.forRoot({
          apiKey: "AIzaSyAGMdOZPvWC-k__DNkAk9aGkPZ8x7OIGeY",
          libraries: ["places"]
        })],
    declarations: [ProviderSignupComponent],
    exports: [ProviderSignupComponent]
})

export class ProviderSignupModule { }
