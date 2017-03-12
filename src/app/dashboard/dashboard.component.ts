import { Component } from '@angular/core';
import * as $ from 'jquery';

/**
*	This class represents the lazy loaded DashboardComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'dashboard-cmp',
	templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {

constructor( ) {
		
		console.log("sadasds");
		$("nav").hide();
		$("#mini-submenu-toggle-button").show();

	}

}
