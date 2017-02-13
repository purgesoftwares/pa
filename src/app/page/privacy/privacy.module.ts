import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { PrivacyComponent } from './privacy.component';

@NgModule({
    imports: [RouterModule, BrowserModule, FormsModule],
    declarations: [PrivacyComponent ],
    exports: [PrivacyComponent]
})

export class PrivacyModule { }
