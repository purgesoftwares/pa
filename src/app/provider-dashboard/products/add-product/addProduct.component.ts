import {Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {ToasterModule, ToasterService} from 'angular2-toaster';


@Component({
	moduleId: module.id,
	selector: 'add-product-cmp',
	templateUrl: 'addProduct.component.html'
})

export class AddProductComponent {
	model: any= { productCategory:[]};
    message: any= {};
    productTypes = [];
    public productCategories: Array<Object>;
    public selectedCategories:any[]=[];
	mess = false;
	loading= false;
	providerId;
	succ = false;
	private ids:any[]=[];
	public show:any[]=[];
	token = localStorage.getItem('access_token');

	private toasterService: ToasterService;


	constructor(private http : Http, private router: Router, toasterService: ToasterService, 
		private route: ActivatedRoute) {
		this.toasterService = toasterService;
	}

	ngOnInit() {

	   this.route.queryParams.subscribe(data => {this.model.id = data['id']});

	   this.http.get('http://54.161.216.233:8090/api/secured/product-types?access_token=' + this.token)
				.map(res => res.json())
				.subscribe(
					data => { 
						this.productTypes = data.content;

						console.log(this.productTypes);
          		},
					error => { if(error.json().error) {
								this.message = error.json().message;
								this.mess = true;
							}},
					() => console.log("complete")
				);

		this.http.get('http://54.161.216.233:8090/api/secured/product-category?access_token=' + this.token)
				.map(res => res.json())
				.subscribe(
					data => { 
						this.productCategories = data.content;
          		},
					error => { if(error.json().error) {
								this.message = error.json().message;
								this.mess = true;
							}},
					() => console.log("complete")
				);

		this.http.get('http://54.161.216.233:8090/api/secured/user/current-provider?access_token=' + this.token)
  				.map(res => res.json())
  				.subscribe(
  					data => { 
  						this.providerId = data.id;
  						this.model.providerId = data.id;
                  	},
  					error => { if(error.json().error) {
									this.message = error.json().message;
									this.mess = true;
								}},
  					() => console.log("complete")
  				);


	   if(this.model.id){

	   	this.http.get('http://54.161.216.233:8090/api/secured/product/' 
	   		+ this.model.id + '?access_token=' + this.token)
				.map(res => res.json())
				.subscribe(
					data => { 
						this.model = data;
						this.ids = this.model.productCategory;
          		},
					error => { if(error.json().error) {
								this.message = error.json().message;
								this.mess = true;
							}},
					() => console.log("complete")
				);

	   }
  	}
	
	save() {

		console.log(this.model);
		console.log(this.selectedCategories);
		this.loading = true;
		/*this.selectedCategories.forEach(function(category) {
	  			thisObj.model.productCategory.push(category.name);
			});*/
		this.model.productCategory = this.ids;
		console.log(this.model);
		this.model.providerId = this.providerId;

		var thisObj = this;
    	this.http.post('http://54.161.216.233:8090/api/secured/product?access_token=' + this.token, this.model)
			.map(res => res.json())
			.subscribe(
				data =>  {	this.succ = true;
							this.message = "Successfully Saved";
							this.toasterService.pop('success', 'Success', this.message);
							setTimeout(() => {
                				this.router.navigate(['/provider-dashboard/products'])
            				}, 1000);},
				error => { if(error.json().error) {
							this.message = error.json().message
							this.mess = true;
							this.toasterService.pop('error', 'Error', this.message);
						}
  						this.loading = false;},
  				() => console.log("complete")
  			);
	}

	
	checking(id: number) {

  		var check = false;
  		var thisObj = this;
  		//console.log(this.model.id);
  		if(this.model.id) {
  			
	  		this.model.productCategory.forEach(function(jv) {
	  			
				if(id == jv) {
	  				check = true;
				}
			});
		}
		return check;
  	}

  	checkbox(event: boolean, category) {
  		console.log(this.selectedCategories);
  		if(event) {
	  		if(this.selectedCategories.indexOf(category) == -1){
	  			this.selectedCategories = [...this.selectedCategories, category];
	  			this.ids = [...this.ids, category.name]
			}
		} else {
			
			var thisObj = this;
			this.selectedCategories = this.selectedCategories.filter(function(elem){
				return elem != category;
	 		})
	 		this.ids = this.ids.filter(function(elem){
				return elem != category.name;
	 		});
		}
  	}

}