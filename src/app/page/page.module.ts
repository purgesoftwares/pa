import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [PageComponent],
    exports: [PageComponent]
})

export class PageModule { }
