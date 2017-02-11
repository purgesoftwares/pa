import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'fronttopnav.html',
})

export class FrontTopNavComponent {
	changeTheme(color: string): void {
		var link: any = '<link></link>';
		//var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
	}

	rtl(): void {
		//var body: any = $('body');
		//body.toggleClass('rtl');
	}

	sidebarToggler(): void  {
		//var sidebar: any = $('#sidebar');
		//var mainContainer: any = $('.main-container');
		//sidebar.toggleClass('sidebar-left-zero');
		//mainContainer.toggleClass('main-container-ml-zero');
	}
}
