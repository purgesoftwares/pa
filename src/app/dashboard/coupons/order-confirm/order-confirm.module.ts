import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { OrderConfirmComponent } from './order-confirm.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [OrderConfirmComponent ],
    exports: [OrderConfirmComponent]
})

export class OrderConfirmModule { }
