import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent {

	loggedIn = false;

	loggedInAsProvider = false;

	private toasterService: ToasterService;
	constructor(private router: Router, toasterService: ToasterService
		, private route: ActivatedRoute) {


		this.isLoggedIn();
		this.isLoggedInAsProvider();
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

	isLoggedInAsProvider() {
		var token = this.getToken();
	    this.loggedInAsProvider = ((token == null || token == "") && localStorage.getItem('isProvider'))?false:true;
	}

	rtl(): void {
		//var body: any = $('body');
		//body.toggleClass('rtl');
	}

	sidebarToggler(): void  {
		var sidebar: any = $('#dashboard-sidebar');
		var mainContainer: any = $('#dashboard-container');
		sidebar.toggleClass('col-lg-3');
		sidebar.toggleClass('hide');
		mainContainer.toggleClass('col-lg-9');
		mainContainer.toggleClass('col-lg-12');
	}

	/*sidebarToggler(): void  {
		//var sidebar: any = $('#sidebar');
		//var mainContainer: any = $('.main-container');
		//sidebar.toggleClass('sidebar-left-zero');
		//mainContainer.toggleClass('main-container-ml-zero');
	}*/
	
	logout() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('isProvider');
		window.location.href = "";
		this.router.navigate(['/']);
	}

}
