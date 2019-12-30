import { Component, OnInit,ViewChild} from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { DistrictApi, ProvinceApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'district.component.html'
})
export class DistrictComponent {
	busy:any;
	dData:any;
	
	display:boolean = false;
	submitted:boolean=false;
	allDistrict:any=[];
	loading:boolean=false;
	filteredDistrict:any=[];
	disCall:any;
	allProvince:any=[];
	filteredProvince:any=[];
	provinceCall:any;
	province_id:any = "";
	district_id:any="";

	province_idSearch:any = "";
	district_idSearch:any="";
	perPageLimit:any=10;
	offsetAuto:any=0;
	total:number=0;
	paginationVal:any=true;
	offset:number=0;

	districtErrors: boolean=false;
	provinceErrors: boolean=false;
	
	constructor(private dApi:DistrictApi,private provinceApi:ProvinceApi, private router: Router) {}
	
	showDialog() { 
		this.display = true;
	}

	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};  
		this.router.navigate(["edit-district"], navigationExtras);
	}

	ngAfterViewInit(): void {
		this.getCount(10,"","","");
	}

	paginate(event) {
		this.dData = [];
		this.offset=event.page;
		this.getData(10,this.offset,this.province_idSearch,this.district_idSearch);
	}

	searchData(){
		this.districtErrors = false;
		this.provinceErrors = false;
		if(this.district_id){
			if(this.district_id.id != "" && this.district_id.id != undefined){
				this.districtErrors = false;
			}else{
				this.districtErrors = true;
			}
		}
		if(this.province_id){
			if(this.province_id.id != "" && this.province_id.id != undefined){
				this.provinceErrors = false;
			}else{
				this.provinceErrors = true;
			}
		}
		if(!this.districtErrors && !this.provinceErrors){
			if(this.province_id){
				this.province_idSearch = this.province_id.id;
			}else{
				this.province_idSearch = "";
			}
			if(this.district_id){
				this.district_idSearch = this.district_id.id;
			}else{
				this.district_idSearch = "";
			}
			
			this.offset = 0;
			this.paginationVal = false;
			this.getCount(10,0,this.province_idSearch,this.district_idSearch);
		}
	}

	getCount(limit,offset,prov,dist){
		this.busy = this.dApi.getDistrictCount("","",dist,prov).subscribe(
			data=>{
				this.total = data.result[0].total;
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.dData = [];
				this.getData(limit,offset,prov,dist)
			},
			err=>{},
			()=>{}
		)
	}

	getData(limit,offset,prov,dist){
		this.busy = this.dApi.getDistrict(10,offset,dist,prov).subscribe(
			data=>{
				var dataLength = data.result.length;
				this.dData = data.result;
			},
			err=>{},
			()=>{}
		)
  	}

	resetData(){
		this.paginationVal = false;
		this.offset = 0;
		this.province_id = null;
		this.district_id = null;
		this.province_idSearch = "";
		this.district_idSearch = "";

		this.districtErrors = false;
		this.provinceErrors = false;
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

	filterProvince(event){ 
		let query = event.query;
		if(this.provinceCall){
			this.provinceCall.unsubscribe();
		}
		this.busy = this.provinceCall = this.provinceApi.getProvince(this.perPageLimit,this.offsetAuto,null,query).subscribe((dataRes)=>{
			this.allProvince = dataRes['result']; 
			this.filteredProvince = this.filterAutocompleteDisData(query, this.allProvince,'name');
		});
	}

	filterDistrict(event){ 
		let query = event.query;
		if(this.disCall){
			this.disCall.unsubscribe();
		}
		let province = null;
		if(this.province_id){
			province = this.province_id.id;
		}
		this.busy = this.disCall = this.dApi.getDistrict(this.perPageLimit,this.offsetAuto,null,province,query).subscribe((dataRes)=>{
			this.allDistrict = dataRes['result']; 
			this.filteredDistrict = this.filterAutocompleteDisData(query, this.allDistrict,'name');
		});
	}
}