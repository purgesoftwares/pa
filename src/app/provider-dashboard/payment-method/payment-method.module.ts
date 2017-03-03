import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { PaymentMethodComponent } from './payment-method.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [PaymentMethodComponent ],
    exports: [PaymentMethodComponent]
})

export class PaymentMethodModule { }
