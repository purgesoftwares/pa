import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

import {FrontTopNavComponent} from '../shared/index';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [PageComponent, FrontTopNavComponent],
    exports: [PageComponent, FrontTopNavComponent]
})

export class PageModule { }
