import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { JoinFriendComponent } from './joinFriend.component';

@NgModule({
    imports: [RouterModule,BrowserModule, FormsModule],
    declarations: [JoinFriendComponent ],
    exports: [JoinFriendComponent]
})

export class JoinFriendModule { }
