import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgotPassword.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [ForgotPasswordComponent],
    exports: [ForgotPasswordComponent]
})

export class ForgotPasswordModule { }
