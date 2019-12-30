import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { MunicipalityApi }   from '../../../shared/loopback_sdk';
import { DistrictApi } from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'municipality.component.html'
})
export class MunicipalityComponent {
	busy:any;
	display:boolean = false;
	submitted:boolean=false;
	mData:any;distData:any;
	allDistrict:any=[];
	filteredDistrict:any=[];
	disCall:any;
	loading:boolean=false;
	allMun:any=[];
	filteredMun:any=[];
	munCall:any;
	district:any;
	municipality:any = "";

	districtSearch:any="";
	municipalitySearch:any = "";
	total:number=0;
	paginationVal:any=true;
	offset:number=0;
	perPageLimit:any=10;

	municipalityErrors: boolean=false;
	districtErrors: boolean=false;
	
	constructor(private dApi:DistrictApi,private mApi:MunicipalityApi,private router: Router) {}
	showDialog() { 
		this.display = true;
	}
	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};
		this.router.navigate(["edit-municipality"], navigationExtras);
	}
	ngAfterViewInit(): void {
		this.getCount(10,"","","");
		
		this.busy = this.dApi.getDistrict().subscribe(
			data=>{
				this.distData = data.result;
				console.log(this.distData);
			},
			err=>{

			},
			()=>
			{}
		);
	}
	
	paginate(event) {
		this.offset=event.page;
		let dis = null;
		this.getCount(10,this.offset,this.districtSearch,this.municipalitySearch);
	}
	
	searchData(){
		this.districtErrors = false;
		this.municipalityErrors = false;
		if(this.district){
			if(this.district.id != "" && this.district.id != undefined){
				this.districtErrors = false;
			}else{
				this.districtErrors = true;
			}
		}
		if(this.municipality){
			if(this.municipality.id != "" && this.municipality.id != undefined){
				this.municipalityErrors = false;
			}else{
				this.municipalityErrors = true;
			}
		}
		if(!this.districtErrors && !this.municipalityErrors){
			if(this.district){
				this.districtSearch = this.district.id;
			}else{
				this.districtSearch = "";
			}
			if(this.municipality){
				this.municipalitySearch = this.municipality.id;
			}else{
				this.municipalitySearch = "";
			}
			this.mData = [];
			this.offset = 0;
			this.paginationVal = false;
			this.getCount(10,0,this.districtSearch,this.municipalitySearch);
		}
	}

	getCount(limit,offset,district,municipality){
		this.busy = this.mApi.getMunicipalityCount(district,null,null,null,municipality).subscribe(
			data=>{
				this.total = data.result[0].total;
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.mData = [];
				this.getData(limit,offset,district,municipality);
			},
			err=>{},	
			()=>{}
		)
	}

	getData(limit,offset,district,municipality){
		this.busy = this.mApi.getMunicipality(district,limit,offset,null,municipality).subscribe(
			data=>{
				var dataLength = data.result.length;
				this.mData = data.result;
			},
			err=>{

			},
			()=>{

			}
		);
	}

	resetData(){
		this.paginationVal = false;
		this.offset = 0;
		this.district = "";
		this.municipality = "";
		this.districtSearch = "";
		this.municipalitySearch = "";
		this.districtErrors = false;
		this.municipalityErrors = false;
		this.getCount(10,this.offset,"","");
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
	
	filterDistrict(event){ 
		let query = event.query;
		if(this.disCall){
			this.disCall.unsubscribe();
		}
		this.busy = this.disCall = this.dApi.getDistrict(this.perPageLimit,this.offset,null,null,query).subscribe((dataRes)=>{
			this.allDistrict = dataRes['result']; 
			this.filteredDistrict = this.filterAutocompleteDisData(query, this.allDistrict,'name');
		});
	}

	filterMun(event){ 
		let query = event.query;
		if(this.munCall){
			this.munCall.unsubscribe();
		}
		let dis = null;
		if(this.district){
			dis = this.district.id;
		}
		this.busy = this.munCall = this.mApi.getMunicipality(dis,this.perPageLimit,this.offset,query,null).subscribe((dataRes)=>{
			this.allMun = dataRes['result']; 
			this.filteredMun = this.filterAutocompleteDisData(query, this.allMun,'name');
			console.log(this.filteredMun);
		});
	}
}
