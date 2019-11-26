import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { DydApi, App_productsApi }  from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent {
	busy:any;
	products:any;
	display:boolean = false;
	rdsData:any;
    total:Number=0;
    paginationVal:any=true;
    offset:Number=0;
	ifEmpty:boolean=false;
	allProduct:any=[];
	filteredProduct:any=[];
	prodCall:any;

	Type:any = "";
	name:any;
	isCement:any = "";

	typeSearch:any = "";
	nameSearch:any="";
	isCementSearch:any = "";
	perPageLimit:any=10;
	offsetAuto:any=0;

	productErrors: boolean=false;
	constructor(private prodApi:App_productsApi,private router: Router,) {

	}
	// view(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 		"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-product"], navigationExtras);
	// }
	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};
		this.router.navigate(["edit-product"], navigationExtras);
	}
	ngAfterViewInit(): void {
		this.products = [];
		this.getCount(10,"","","","");
	}
	paginate(event) {
    	this.offset=event.page;
		let prodId = null;
		if(this.name){
			prodId = this.nameSearch.id;
		}
		this.getData(10,this.offset,this.typeSearch,this.isCementSearch,prodId);
	}
	searchData(){
		this.productErrors = false;
		if(this.name){
			if(this.name.id != "" && this.name.id != undefined){
				this.productErrors = false;
			}else{
				this.productErrors = true;
			}
		}
		if(!this.productErrors){
			this.paginationVal = false;
			this.offset = 0;
			this.ifEmpty = false;
			this.rdsData = [];
			this.typeSearch = this.Type;
			console.log("this.Type",this.Type);
			this.nameSearch = this.name;
			this.isCementSearch = this.isCement;
			this.getCount(10,0,this.nameSearch,this.typeSearch,this.isCementSearch);
		}
	}
	getCount(limit,offset,prodId,type,iscement){
		if(prodId){
			prodId = prodId.id;
		}
		this.busy = this.prodApi.getProductslistCount(null,iscement,type,null,null,prodId).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.products = [];
				this.getData(limit,offset,type,iscement,prodId);
			},
			err=>{},	
			()=>{}
		)
	}
	getData(limit,offset,type,iscement,prodId){
		this.busy = this.prodApi.getProductslist(null,iscement,type,limit,offset,prodId).subscribe(
			data=>{
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.ifEmpty = true;
				}
				this.products=data.result;
				for(var i=0; i<dataLength; i++){
					if(this.products[i].type == "holcim_product"){
						this.products[i].type = "Holcim";
					}else{
						this.products[i].type = "Non Holcim";
					} 
					if(this.products[i].is_cement == 1){
						this.products[i].is_cement = "Yes";
					}else{
						this.products[i].is_cement = "No";
					}
				}
			},
			err=>{
			},
			()=>{

			}
		)
	}
	resetData(){
		this.paginationVal = false;
		this.offset = 0;
		this.ifEmpty = false;
		this.name = "";
		this.Type = "";
		this.isCement = "";
		this.productErrors = false;

		this.nameSearch = "";
		this.typeSearch = "";
		this.isCementSearch = "";
		this.getCount(10,this.offset,"","","");
	}
	
	filterProduct(event){ 
		let query = event.query;
		if(this.prodCall){
			this.prodCall.unsubscribe();
		}
		this.prodCall = this.busy = this.prodApi.getProductslist(query,null,null,this.perPageLimit,this.offsetAuto).subscribe((dataRes)=>{
			this.allProduct = dataRes['result']; 
			this.filteredProduct = this.filterAutocompleteDisData(query, this.allProduct,'name');
		});
	}

	filterAutocompleteDisData(query, filterAllData: any[],keyName):any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered : any[] = [];
		for(let i = 0; i < filterAllData.length; i++) {
			let currData = filterAllData[i];
				if(query=='' || query==null){
					filtered.push(currData);
					if(i==this.perPageLimit){
						break;
					}
				}else if(currData[keyName].toString().toLowerCase().includes(query.toLowerCase())) {
					  filtered.push(currData);
				}
		} 
		return filtered;
	}
}
