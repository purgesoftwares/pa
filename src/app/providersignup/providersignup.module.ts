import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProviderSignupComponent } from './providersignup.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [ProviderSignupComponent],
    exports: [ProviderSignupComponent]
})

export class ProviderSignupModule { }
