import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { UserComponent } from './user.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [UserComponent],
    exports: [UserComponent]
})

export class UserModule { }
