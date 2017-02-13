import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent {

	loggedIn = false;

	private toasterService: ToasterService;
	constructor(private router: Router, toasterService: ToasterService) {
		this.isLoggedIn();
		this.toasterService = toasterService;
	}


    popToast() {
        this.toasterService.pop('success', 'Args Title', 'Args Body');
    }

	changeTheme(color: string): void {
		var link: any = '<link></link>';
		//var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
	}

	getToken() {
	    return localStorage.getItem('access_token');
	}
	isLoggedIn() {
		var token = this.getToken();
	    this.loggedIn = (token == null || token == "")?false:true;
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
	
	logout() {
		localStorage.removeItem('access_token');
		this.router.navigate(['/']);
	}

}
