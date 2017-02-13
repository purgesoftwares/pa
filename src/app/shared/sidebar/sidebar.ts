import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent {
	isActive = false;
	showMenu: string = '';
	eventCalled() {
		this.isActive = !this.isActive;
	}
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}

	}

	loggedIn = false;
	private toasterService: ToasterService;
	constructor(private router: Router, toasterService: ToasterService) {
		this.isLoggedIn();
		this.toasterService = toasterService;
	}

	getToken() {
	    return localStorage.getItem('access_token');
	}
	isLoggedIn() {
		var token = this.getToken();
	    this.loggedIn = (token == null || token == "")?false:true;
	}

	logout() {
		localStorage.removeItem('access_token');
		window.location.href = "";
		this.router.navigate(['/']);
	}
}
