import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProviderLoginComponent } from './providerlogin.component';
import { FormsModule }   from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [ProviderLoginComponent],
    exports: [ProviderLoginComponent]
})


export class ProviderLoginModule { }
