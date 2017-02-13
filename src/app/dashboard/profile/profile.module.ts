import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ProfileComponent } from './profile.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [ProfileComponent ],
    exports: [ProfileComponent]
})

export class ProfileModule { }
