import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { SendAnotherEmailComponent } from './send-another-email.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [SendAnotherEmailComponent ],
    exports: [SendAnotherEmailComponent]
})

export class SendAnotherEmailModule { }
