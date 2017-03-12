import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ProductComponent } from './product.component';
import { AddProductModule } from './add-product/addProduct.module';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule, AddProductModule ],
    declarations: [ProductComponent ],
    exports: [ProductComponent]
})

export class ProductModule { }
