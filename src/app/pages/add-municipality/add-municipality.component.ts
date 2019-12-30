import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { MunicipalityApi,LoopBackAuth ,RegionApi, ProvinceApi, DistrictApi, User_mapApi}   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-municipality.component.html'
})
export class AddMunicipalityComponent {
	@ViewChild('regionId') regionId: NgModel;
	@ViewChild('provinceId') provinceId: NgModel;
	@ViewChild('districtId') districtId: NgModel;
	@ViewChild('name') name: NgModel;
	@ViewChild('code') code: NgModel;

	display:boolean = false;
	submitted:boolean=false;
	distData:any;
	result:any;
	munName:any;
	loading:boolean=false;
	munCode:any;
	
	userDetails:any;
	rolename:any;
	
	namechkRes:boolean= false;
	namechkResErr:boolean= false;
	busy:any;
	
	Prvnc:any;
	region_id:any;
	Distr:any;
	
	allRegion:any=[];
	filteredRegion:any=[];
	regionCall:any;
	
	allProvince:any=[];
	filteredProvince:any=[];
	provinceCall:any;
	
	allDistrict:any=[];
	filteredDistrict:any=[];
	districtCall:any;
	
	perPageLimit:any=10;
	offsetAuto:any=0;
	nameChange:any;
	
	constructor(private dApi:DistrictApi,private mApi:MunicipalityApi, private loopAuth:LoopBackAuth, private provApi:ProvinceApi, private regionApi:RegionApi,private userMapApi:User_mapApi, private router:Router){
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	
	submit() {
		this.submitted=true;  
		var user_id = this.userDetails.userDet.id;
		this.namechkResErr = false;
		
		if(this.munName){
			this.munName = this.munName.trim();
		}
		
		if(this.munName.match(/^[a-zA-Z0-9 ]+$/) && (this.munName!='')){
			this.namechkResErr = true;
		}
		
		if(this.Distr&&this.code.valid&&this.namechkRes == true&&(this.munName.match(/^[a-zA-Z0-9 ]+$/) && (this.munName!=''))){
			let para={name: this.name.value,district_id:this.Distr.id,municipality_code:this.code.value, status:1,created_by:user_id, updated_by:user_id};
			this.busy=this.mApi.addEditMunicipality(para).subscribe((Res)=>{
				this.result = "success";
				this.display = true; 
				setTimeout(()=>{
					  this.router.navigate(['/municipality']);
				},3000);
			},(userErr)=>{
				this.result = "failed";
				this.display = true;
			});
		}
	}

	ngOnInit(): void {}
	
	NameChange(name){
		name = name.trim();
		this.munCode = null;
		if(name.match(/^[a-zA-Z0-9 ]+$/) && (name!='')){
			this.namechkRes = false;
			this.munCode = '';
			if(this.nameChange){
				this.nameChange.unsubscribe();
			}
			this.busy = this.nameChange = this.mApi.munNamechek(name).subscribe((Res)=>{		
				if(Res.result!=''){
					this.munCode = name+'-'+( ( parseInt(Res.result[0].code.split('-')[1]) )+1 );
				}else{
					this.munCode = name+'-'+1;
				}
				this.namechkRes = true;
				this.namechkResErr = false;
			},(userErr)=>{
				this.namechkRes = true;
			});
		}else{
			setTimeout(()=>{
				  this.munCode = null;
			},10);
			this.namechkRes = true;
		}
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
	
	deSelect(event,type){
		let query = event.code;
		if(query == "Backspace"){
			this.filterResetChildTax(type);
		}
	}
	
	filterRegion(event){ 
		let query = event.query;
		if(this.regionCall){
			this.regionCall.unsubscribe();
		}
		let dataObj={};
		dataObj['region'] = [];
		dataObj['province']=[];
		dataObj['district']=[];
		dataObj['municipality']=[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		dataObj['regionTagged']='yes';
		dataObj['provinceTagged']='yes';
		let fKeyName="region";
		let fVaue=query;
		this.regionCall  = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allRegion = dataRes['result']; 
			this.filteredRegion = this.filterAutocompleteDisData(query, this.allRegion,'name');
		});
	}
	
	filterProvince(event){ 
		let query = event.query;
		if(this.provinceCall){
			this.provinceCall.unsubscribe();
		}
		let dataObj={};
		dataObj['region']=this.region_id?[this.region_id]:[];
		dataObj['province']=[];
		dataObj['district']=[];
		dataObj['municipality']=[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		dataObj['regionTagged']='yes';
		dataObj['provinceTagged']='yes';
		let fKeyName="province";
		let fVaue=query;
		this.provinceCall  = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allProvince = dataRes['result']; 
			this.filteredProvince = this.filterAutocompleteDisData(query, this.allProvince,'name');
		});
	}
	
	filterDistrict(event){ 
		let query = event.query;
		if(this.districtCall){
			this.districtCall.unsubscribe();
		}
		let dataObj={};
		dataObj['region']=this.region_id?[this.region_id]:[];
		dataObj['province']=this.Prvnc?[this.Prvnc]:[];
		dataObj['district']=[];
		dataObj['municipality']=[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		dataObj['regionTagged']='yes';
		dataObj['provinceTagged']='yes';
		let fKeyName="district";
		let fVaue=query;
		this.districtCall  = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allDistrict = dataRes['result']; 
			this.filteredDistrict = this.filterAutocompleteDisData(query, this.allDistrict,'name');
		});
	}
	
	filterResetChildTax(fromName){
		setTimeout(()=>{
			let event={query:''}
			let forName='selected';
			if(fromName=="region"){
				this.Prvnc=null;
				this.Distr=null;
			}else if(fromName=="province"){
				this.Distr=null;
			}
	    },10);
	}
	
	filterRegionMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('region');
	}
	filterProvinceMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('province');
	}
	filterDistrictMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('district');
	}
	
	filterRegionMultipleSelect(unselectedData) {
		this.filterResetChildTax('region');
	}
	filterProvinceMultipleSelect(unselectedData) {
		this.filterResetChildTax('province');
	}
	filterDistrictMultipleSelect(unselectedData) {
		this.filterResetChildTax('district');
	}
}
