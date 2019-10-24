import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackAuth,SubdistrictApi,MunicipalityApi,DistrictApi,ProvinceApi,RegionApi,User_mapApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-subdistrict.component.html'
})

export class AddSubdistrictComponent {
	@ViewChild('name') name: NgModel;
	@ViewChild('code') code: NgModel;
	@ViewChild('regionId') regionId: NgModel;
	@ViewChild('provinceId') provinceId: NgModel;
	@ViewChild('districtId') districtId: NgModel;
	@ViewChild('cityId') cityId: NgModel;
	
	postal_code_codeId:any;
	
	Prvnc:any;
	Distr:any;
	cty:any;
	region_id:any;
	
	display:boolean = false;
	submitted:boolean = false;
	result:any;

	busy:any;
	
	userDetails:any;
	rolename:any;
	
	namechkRes:boolean= false;
	namechkResErr:boolean= false;
	distRegion_id:any;
	
	allRegion:any=[];
	filteredRegion:any=[];
	regionCall:any;
	
	allProvince:any=[];
	filteredProvince:any=[];
	provinceCall:any;
	
	allMun:any=[];
	filteredMun:any=[];
	munCall:any;
	
	allDistrict:any=[];
	filteredDistrict:any=[];
	districtCall:any;
	
	allSubDistrict:any=[];
	filteredSubDistrict:any=[];
	subDisCall:any;
	
	perPageLimit:any=10;
	offsetAuto:any=0;
	rdssbdstrct:any;
	
	subdistrictcode:any;
	subdistrictName:any;
	
	nameChange:any;
	
	constructor(private sdApi:SubdistrictApi,private mApi:MunicipalityApi, private regionApi:RegionApi, private loopAuth:LoopBackAuth,private dApi:DistrictApi,private provApi:ProvinceApi,private userMapApi:User_mapApi, private router:Router ) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}

	showDialog() { 
		this.display = true;
	}
	
	submit() {
		this.submitted=true;
		var user_id = this.userDetails.userDet.id;
		this.namechkResErr = false;
		
		if(this.namechkRes == false&&this.name.valid){
			this.namechkResErr = true;
		}
		if(this.subdistrictName){
			this.subdistrictName = this.subdistrictName.trim();
		}
		
		if(this.Prvnc&&this.Distr&&this.cty&&this.namechkRes == true&&(this.subdistrictName.match(/^[a-zA-Z0-9 ]+$/) && (this.subdistrictName!=''))){
			let para={name: this.name.value,municipality_id:this.cty.id, subdistrict_code:this.code.value,status:1,created_by:user_id, updated_by:user_id}
			this.busy=this.sdApi.addEditSubdistrict(para).subscribe((Res)=>{
				this.result = "success";
				this.showDialog();
				setTimeout(()=>{
					  this.router.navigate(['/subdistrict']);
				},3000);
				
			},(userErr)=>{
				this.result = "Failed";	
				this.showDialog();
			});
		}
	}

	ngOnInit(): void {
		
	}

	NameChange(name){
		name = name.trim();
		if(name.match(/^[a-zA-Z0-9 ]+$/) && (name!='')){
			this.namechkRes = false;
			this.subdistrictcode = null;
			if(this.nameChange){
				this.nameChange.unsubscribe();
			}
			this.nameChange = this.busy = this.sdApi.subDistrictNamechek(name).subscribe((Res)=>{
				if(Res.result!=''){
					this.subdistrictcode = name+'-'+( ( parseInt(Res.result[0].code.split('-')[1]) )+1 );
				}else{
					this.subdistrictcode = name+'-'+1;
				}
				this.namechkRes = true;
				this.namechkResErr = false;
			},(userErr)=>{
				this.namechkRes = true;
			});
		}else{
			this.subdistrictcode = null;
			this.namechkRes = true;
			setTimeout(()=>{
				  this.subdistrictcode = null;
			},20);
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
		dataObj['districtTagged']='yes';
		let fKeyName="region";
		let fVaue=query;
		this.regionCall = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
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
		dataObj['districtTagged']='yes';
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
		dataObj['districtTagged']='yes';
		let fKeyName="district";
		let fVaue=query;
		this.districtCall  = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allDistrict = dataRes['result']; 
			this.filteredDistrict = this.filterAutocompleteDisData(query, this.allDistrict,'name');
		});
	}
	
	filterMun(event){ 
		let query = event.query;
		if(this.munCall){
			this.munCall.unsubscribe();
		}
		
		let dataObj={};
		dataObj['region']=this.region_id?[this.region_id]:[];
		dataObj['province']=this.Prvnc?[this.Prvnc]:[];
		dataObj['district']=this.Distr?[this.Distr]:[];
		dataObj['municipality']=[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		dataObj['regionTagged']='yes';
		dataObj['provinceTagged']='yes';
		dataObj['districtTagged']='yes';
		let fKeyName="municipality";
		let fVaue=query;
		this.munCall  = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allMun = dataRes['result']; 
			this.filteredMun = this.filterAutocompleteDisData(query, this.allMun,'name');
		});
	}
	
	filterResetChildTax(fromName){
		setTimeout(()=>{
			let event={query:''}
			let forName='selected';
			console.log(fromName);
			if(fromName=="region"){
				this.Prvnc=null;
				this.Distr=null;
				this.cty=null;
			}else if(fromName=="province"){
				this.Distr=null;;
				this.cty=null;
			}else if(fromName=="district"){
				this.cty=null;
			}else if(fromName=="municipality"){
			}else if(fromName=="subdistrict"){
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
	filterMunMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('municipality');
	}
	filterSubDistrictMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('subdistrict');
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
	filterMunMultipleSelect(unselectedData) {
		this.filterResetChildTax('municipality');
	}
	filterSubDistrictMultipleSelect(unselectedData) {
		this.filterResetChildTax('subdistrict');
	}
}