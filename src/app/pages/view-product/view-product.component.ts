import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { DydApi, App_productsApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation

@Component({
  templateUrl: 'view-product.component.html'
})
export class ViewProductComponent {
	public id: number;
	products: any = [];
	
	project_photo_array: any = []; bank_document_array: any = []; nmc_document_array:any = [];
	constructor(private route: ActivatedRoute,private prodApi:App_productsApi,private router: Router) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });
		this.id = this.route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.prodApi.findById(this.id).subscribe(
			data=>{
				this.products=data;
				
				if(this.products.type == "holcim_product"){
					this.products.type = "Holcim";
				}else{
					this.products.type = "Non Holcim";
				} 
				if(this.products.is_cement == 1){
					this.products.is_cement = "Yes";
				}else{
					this.products.is_cement = "No";
				}
				console.log(this.products);
			},
			err=>{
			},
			()=>{

			}
		)
    }
}
