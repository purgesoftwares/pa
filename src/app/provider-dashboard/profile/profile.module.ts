import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ProviderProfileComponent } from './profile.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [ProviderProfileComponent ],
    exports: [ProviderProfileComponent]
})

export class ProviderProfileModule { }
