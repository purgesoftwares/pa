import {Component} from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from './user.service';

@Component({
	moduleId: module.id,
	selector: 'user-cmp',
	templateUrl: 'user.component.html',

	providers: [UserService]
})

export class UserComponent {
	getData = [];
	
	constructor(private _http :  UserService) {}

	ngOnInit() {
		this._http.getData()
			.subscribe(
				data => this.getData = data
			);
	}

	testSubmit(){
		var json = JSON.stringify({page:'testt', visit:'123', new_visit: '434', revenu: '500'});
		console.log(json);
		this.getData.push(json);  
		console.log(this.getData);
	}
}
