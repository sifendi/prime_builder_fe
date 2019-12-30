import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { MunicipalityApi,SubdistrictApi,User_mapApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'subdistrict.component.html'
})

export class SubdistrictComponent {
	busy:any;
	@ViewChild('cityId') cityId: NgModel;
	@ViewChild('subDisId') subDisId: NgModel;
	sdData:any;mData:any;
	display:boolean = false;
	submitted:boolean = false;
	allMun:any=[];
	loading:boolean=false;
	filteredMun:any=[];
	munCall:any;
	allSubDistrict:any=[];
	filteredSubDistrict:any=[];
	subDisCall:any;
	rdssbdstrct:any;
	subdistrict_id:any;
	cty:any;

	total:number=0;
	paginationVal:any=true;
	offset:number=0;
	perPageLimit:any=10;
	offsetAuto:any=0;
	subdistrict_idSearch:any="";
	ctySearch:any="";

	municipalityErrors: boolean=false;
	subDistrictErrors: boolean=false;
	
	constructor(private sdApi:SubdistrictApi,private mApi:MunicipalityApi,private router: Router,private userMapApi:User_mapApi) {}
	
	showDialog() { 
		this.display = true;
	}

	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};
		this.router.navigate(["edit-subdistrict"], navigationExtras);
	}
	
	paginate(event) {
		this.sdData = [];
		this.offset=event.page;
		this.getData(10,this.offset,this.subdistrict_idSearch,this.ctySearch);
	}

	ngAfterViewInit(): void {
		this.getCount(10,0,null,null);
	}
	
	searchData(){
		this.subDistrictErrors = false;
		this.municipalityErrors = false;
		if(this.subdistrict_id){
			if(this.subdistrict_id.id != "" && this.subdistrict_id.id != undefined){
				this.subDistrictErrors = false;
			}else{
				this.subDistrictErrors = true;
			}
		}
		if(this.cty){
			if(this.cty.id != "" && this.cty.id != undefined){
				this.municipalityErrors = false;
			}else{
				this.municipalityErrors = true;
			}
		}
		if(!this.subDistrictErrors && !this.municipalityErrors){
			if(this.cty){
				this.ctySearch = this.cty.id;
			}else{
				this.ctySearch = "";
			}
			if(this.subdistrict_id){
				this.subdistrict_idSearch = this.subdistrict_id.id;
			}else{
				this.subdistrict_idSearch = "";
			}
			this.offset = 0;
			this.paginationVal = false;
			this.getCount(10,"",this.subdistrict_idSearch,this.ctySearch);
		}
	}
	
	resetData(){
		this.subdistrict_id = null;
		this.cty = null;
		this.paginationVal = false;
		this.offset = 0;
		this.subdistrict_idSearch="";
		this.ctySearch="";
		this.subDistrictErrors = false;
		this.municipalityErrors = false;
		this.getCount(10,0,null,null);
	}

	getCount(limit,offset,subdistrict_id,city){
		this.busy = this.sdApi.getSubDistrictCount(null,null,city,null,subdistrict_id).subscribe(
			data=>{
				this.total = data.result[0].total;
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(limit,offset,subdistrict_id,city);
			},
			err=>{},
			()=>{}
		)
	}

	getData(limit,offset,subdistrict_id,city){
		this.busy = this.sdApi.getSubDistrict(10,offset,city,null,subdistrict_id).subscribe(
			data=>{
				this.sdData = data.result;
			},
			err=>{},
			()=>{}
		)
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

	filterMun(event){ 
		let query = event.query;
		if(this.munCall){
			this.munCall.unsubscribe();
		}
		
		this.busy = this.munCall = this.mApi.getMunicipality(null,null,null,query).subscribe((dataRes)=>{
			this.allMun = dataRes['result']; 
			this.filteredMun = this.filterAutocompleteDisData(query, this.allMun,'name');
		});
	}

	filterSubDistrict(event){ 
		let query = event.query;
		if(this.subDisCall){
			this.subDisCall.unsubscribe();
		}
		let cityId = null;
		if(this.cty){
			cityId = this.cty.id;
		}
		this.busy = this.subDisCall = this.sdApi.getSubDistrict(null,null,cityId,query).subscribe((dataRes)=>{
			this.allSubDistrict = dataRes['result']; 
			this.filteredSubDistrict = this.filterAutocompleteDisData(query, this.allSubDistrict,'name');
		});
	}
}