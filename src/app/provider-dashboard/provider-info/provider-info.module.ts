import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ProviderInfoComponent } from './provider-info.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [ProviderInfoComponent ],
    exports: [ProviderInfoComponent]
})

export class ProviderInfoModule { }
