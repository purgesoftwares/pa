import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [RouterModule, BrowserModule, FormsModule],
    declarations: [HomeComponent ],
    exports: [HomeComponent]
})

export class HomeModule { }
