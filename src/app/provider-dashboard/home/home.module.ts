import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ProviderHomeComponent } from './home.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ProviderHomeComponent],
    exports: [ProviderHomeComponent]
})

export class ProviderHomeModule { }
