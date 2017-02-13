import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HelpComponent } from './help.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [HelpComponent ],
    exports: [HelpComponent]
})

export class HelpModule { }
