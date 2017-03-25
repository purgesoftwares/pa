import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrcodeComponent } from './qrcode.component';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
    imports: [RouterModule, BrowserModule, FormsModule, ReactiveFormsModule, QRCodeModule],
    declarations: [QrcodeComponent ],
    exports: [ QrcodeComponent]
})

export class QrcodeModule { }
