import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AddProductComponent } from './addProduct.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [AddProductComponent ],
    exports: [AddProductComponent]
})

export class AddProductModule { }
