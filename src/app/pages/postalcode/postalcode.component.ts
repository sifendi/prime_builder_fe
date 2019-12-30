import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Postal_codeApi,SubdistrictApi } from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'postalcode.component.html'
})
export class PostalCodeComponent {
	busy:any;
	@ViewChild('subdistrict_id') subdistrict_id: NgModel;
	@ViewChild('postal_code') postal_code: NgModel;
	display:boolean = false;
	submitted:boolean = false;
	postalCode:any;sdData:any;
	loading:boolean=false;
	allSubDistrict:any=[];
	filteredSubDistrict:any=[];
	subDisCall:any;
	allPostal:any=[];
	filteredPostal:any=[];
	postalCall:any;
	rdssbdstrct:any;
	postlcd:any;

	total:number=0;
	paginationVal:any=true;
	offset:number=0;
	perPageLimit:any=100;
	offsetAuto:any=0;
	rdssbdstrctSearch:any="";
	postlcdSearch:any="";

	postalCodeErrors: boolean=false;
	subDistrictErrors: boolean=false;

	constructor(private pcApi:Postal_codeApi,private sdApi:SubdistrictApi, private router: Router) {}
	
	showDialog() { 
    this.display = true;
	}
	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};  
		this.router.navigate(["edit-postalcode"], navigationExtras);
	}
	ngAfterViewInit(): void {
		this.getCount("","");
		this.busy = this.pcApi.count().subscribe(
			data=>{
				this.total = data['count'];
			},
			err=>{},
			()=>{}
		)
	}
	paginate(event) {
    	this.postalCode = [];
		this.offset=event.page;
		this.getCount(this.postlcdSearch,this.rdssbdstrctSearch);
	}

	searchData(){
		this.subDistrictErrors = false;
		this.postalCodeErrors = false;
		if(this.rdssbdstrct){
			if(this.rdssbdstrct.id != "" && this.rdssbdstrct.id != undefined){
				this.subDistrictErrors = false;
			}else{
				this.subDistrictErrors = true;
			}
		}
		if(this.postlcd){
			if(this.postlcd.id != "" && this.postlcd.id != undefined){
				this.postalCodeErrors = false;
			}else{
				this.postalCodeErrors = true;
			}
		}
		if(!this.subDistrictErrors && !this.postalCodeErrors){
			this.offset = 0;
			this.paginationVal = false;
			if(this.rdssbdstrct){
				this.rdssbdstrctSearch = this.rdssbdstrct.id;
			}else{
				this.rdssbdstrctSearch = "";
			}
			if(this.postlcd){
				this.postlcdSearch = this.postlcd.id;
			}else{
				this.postlcdSearch = "";
			}
			this.getCount(this.postlcdSearch,this.rdssbdstrctSearch);
		}
	}

	getCount(ptalcode,subdistrict){
		this.busy = this.pcApi.getPostalCodeCount(null,ptalcode,null,subdistrict).subscribe(
			data=>{
				this.total = data.result[0].total;
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.postalCode = [];
				this.getData(this.rdssbdstrctSearch,this.postlcdSearch)
			},
			err=>{},
			()=>{}
		)
	}
	
	getData(subDis,postal){
		this.busy = this.pcApi.getPostalCode(100,this.offset,postal,null,null,subDis).subscribe(
			data=>{
				this.postalCode=data.result;
			},
			err=>{
				
			},
			()=>{

			}
		)
	}

	resetData(){
		this.paginationVal = false;
		this.postlcd=null;
		this.rdssbdstrct=null;
		this.offset=0;
		this.postlcdSearch=null;
		this.rdssbdstrctSearch=null;

		this.subDistrictErrors = false;
		this.postalCodeErrors = false;
		this.getCount("","");
	}
	
	filterSubDistrict(event){ 
		let query = event.query;
		if(this.subDisCall){
			this.subDisCall.unsubscribe();
		}
		this.busy = this.subDisCall = this.sdApi.getSubDistrict(this.perPageLimit,this.offsetAuto,null,query).subscribe((dataRes)=>{
			this.allSubDistrict = dataRes['result']; 
			this.filteredSubDistrict = this.filterAutocompleteDisData(query, this.allSubDistrict,'subdistrict_code');
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
	
	filterPostal(event){ 
		let query = event.query;
		if(this.postalCall){
			this.postalCall.unsubscribe();
		}
		let subDis = null;
		if(this.rdssbdstrct){
			subDis = this.rdssbdstrct.id;
		}
		this.busy = this.postalCall = this.pcApi.getPostalCode(this.perPageLimit,this.offsetAuto,null,query,null,subDis).subscribe((dataRes)=>{
			this.allPostal = dataRes['result']; 
			this.filteredPostal = this.filterAutocompleteDisData(query, this.allPostal,'postalcode_code');
			console.log(this.filteredPostal);
		});
	}
}
