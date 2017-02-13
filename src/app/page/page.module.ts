import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { HelpModule } from './help/help.module';
import { HomeModule } from './home/home.module';

@NgModule({
    imports: [CommonModule, RouterModule, HelpModule, HomeModule],
    declarations: [PageComponent],
    exports: [PageComponent]
})

export class PageModule { }
