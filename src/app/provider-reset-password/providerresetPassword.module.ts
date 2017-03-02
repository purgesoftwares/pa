import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProviderResetPasswordComponent } from './providerresetPassword.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [ProviderResetPasswordComponent],
    exports: [ProviderResetPasswordComponent]
})

export class ProviderResetPasswordModule { }
