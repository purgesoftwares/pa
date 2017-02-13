import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AboutComponent } from './about.component';

@NgModule({
    imports: [RouterModule, BrowserModule, FormsModule],
    declarations: [AboutComponent ],
    exports: [AboutComponent]
})

export class AboutModule { }
