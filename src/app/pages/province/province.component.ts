import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ProvinceApi,RegionApi }   from '../../../shared/loopback_sdk';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
  templateUrl: 'province.component.html',
  providers: [ConfirmationService]
})

export class ProvinceComponent {	
	busy:any;
	display:boolean = false;
	loading:boolean=false;
	submitted:boolean=false;
	proData:any;
	regiond:any;	
	result:any;
	allRegion:any=[];
	filteredRegion:any=[];
	regionCall:any;
	allProvince:any=[];
	filteredProvince:any=[];
	provinceCall:any;
	
	province_id:any;
	region_id:any;
	perPageLimit:any=10;
	offsetAuto:any=0;
	offset:any = 0;
	total:any;
	paginationVal:any=true;
	region_idSearch: any="";
	province_idSearch: any="";
	regionErrors: boolean=false;
	provinceErrors: boolean=false;
	
	constructor(private proApi:ProvinceApi, private regionApi:RegionApi, private router: Router,private confirmationService: ConfirmationService) {}
  
	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};  
		this.router.navigate(["edit-province"], navigationExtras);
	}
	paginate(event) {
		this.proData = [];
		this.offset=event.page;
		this.getCount(10,this.offset,this.province_idSearch,this.region_idSearch);
	}
	
	ngAfterViewInit(): void {
		this.getCount(10,null,null,null);
	}
	searchData(){
		this.regionErrors = false;
		this.provinceErrors = false;
		if(this.region_id){
			if(this.region_id.id != "" && this.region_id.id != undefined){
				this.regionErrors = false;
			}else{
				this.regionErrors = true;
			}
		}
		if(this.province_id){
			if(this.province_id.id != "" && this.province_id.id != undefined){
				this.provinceErrors = false;
			}else{
				this.provinceErrors = true;
			}
		}
		if(!this.regionErrors && !this.provinceErrors){
			if(this.region_id){
				this.region_idSearch = this.region_id.id;
			}else{
				this.region_idSearch = "";
			}
			if(this.province_id){
				this.province_idSearch = this.province_id.id;
			}else{
				this.province_idSearch = "";
			}
			this.paginationVal = false;
			this.offset = 0;
			this.getCount(10,0,this.province_idSearch,this.region_idSearch);
		}
	}

	getCount(limit,offset,prov,reg){
		this.busy = this.proApi.getProvinceCount("","",reg,null,prov).subscribe(
		data=>{
			this.total = data.result[0].total;
			if(this.total <= 10){
				this.paginationVal = false;
			}else{
				this.paginationVal = true;
			}
			this.proData = [];
			this.getData(limit,offset,prov,reg)
		},
		err=>{},
		()=>{}
		)
	}
	
	getData(limit,offset,prov,reg){
		this.busy = this.proApi.getProvince(limit,offset,reg,null,prov).subscribe(
			data=>{
				var dataLength = data.result.length;
				this.proData = data.result;
			},
			err=>{

			},
			()=>{

			}
		)
	}
	resetData(){
		this.province_id = "";
		this.region_id = "";    
		this.offset = 0;
		this.paginationVal = false;
		this.region_idSearch = "";
		this.province_idSearch="";
		this.regionErrors = false;
		this.provinceErrors = false;
		this.getCount(10,this.offset,null,null);
	}

	filterRegion(event){ 
		let query = event.query;
		if(this.regionCall){
			this.regionCall.unsubscribe();
		}
		// let province = null;
		// if(this.province_id){
		// 	province = this.province_id.id;
		// }
		this.busy = this.regionCall = this.regionApi.getRegion(this.perPageLimit,this.offsetAuto,query).subscribe((dataRes)=>{
			this.allRegion = dataRes['result']; 
			this.filteredRegion = this.filterAutocompleteDisData(query, this.allRegion,'name');
		});
	}

	filterProvince(event){ 
		let query = event.query;
		if(this.provinceCall){
			this.provinceCall.unsubscribe();
		}
		let region = null;
		if(this.region_id){
			region = this.region_id.id;
		}
		this.busy = this.provinceCall = this.proApi.getProvince(this.perPageLimit,this.offsetAuto,region,query).subscribe((dataRes)=>{
			this.allProvince = dataRes['result']; 
			this.filteredProvince = this.filterAutocompleteDisData(query, this.allProvince,'name');
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