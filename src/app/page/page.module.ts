import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

import {FrontTopNavComponent} from '../shared/index';
import {FooterComponent} from '../shared/index';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [PageComponent, FrontTopNavComponent, FooterComponent],
    exports: [PageComponent, FrontTopNavComponent, FooterComponent]
})

export class PageModule { }
