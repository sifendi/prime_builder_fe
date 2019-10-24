import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Postal_codeApi,ProvinceApi,MunicipalityApi,DistrictApi,RegionApi,SubdistrictApi,LoopBackAuth,User_mapApi} from '../../../shared/loopback_sdk';
import {  }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'edit-postalcode.component.html'
})
export class EditPostalCodeComponent {
	@ViewChild('postal_code') postal_code: NgModel;
	@ViewChild('postal_code_code') postal_code_code: NgModel;
	@ViewChild('regionId') regionId: NgModel;
	@ViewChild('provinceId') provinceId: NgModel;
	@ViewChild('districtId') districtId: NgModel;
	@ViewChild('cityId') cityId: NgModel;
	@ViewChild('subDisId') subDisId: NgModel;
	
	postal_code_codeId:any;
	
	Prvnc:any;
	Distr:any;
	cty:any;
	region_id:any;
	subdistrict_id:any;

	display:boolean = false;
	submitted:boolean = false;
	result:any;

	postPrvnc:any;
	postDist:any;
	postcty:any;
	postal_codeId:any;
	subdistrictid:any;
	busy:any;
	provData:any;
	dData:any=[];
	mData:any=[];
	sdData:any=[];
	regionData:any;
	loading:boolean = false;
	
	userDetails:any;
	rolename:any;
	
	namechkRes:boolean= true;
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
	
	prevName:any;
	prevCode:any;
	
	id:any;
	constructor(private pcApi:Postal_codeApi, private regionApi:RegionApi,private sdApi:SubdistrictApi,private provApi:ProvinceApi,private mApi:MunicipalityApi,private dApi:DistrictApi, private loopAuth:LoopBackAuth,private router:ActivatedRoute,private userMapApi:User_mapApi){
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		// this.router.queryParams.subscribe(params => {
			// this.id = params["id"];
		// });
		this.id = this.router.snapshot.params['id'];
	}
	
	
	ngOnInit(): void {
		this.busy=this.pcApi.getPostalCode(0,0,this.id).subscribe(
			data=>{
				
				this.prevName = data.result[0].postal_code;
				this.prevCode = data.result[0].postalcode_code;
				
				this.subdistrict_id = {name:data['result'][0]['subdistrict_name'],id:data['result'][0]['subdistrict_id']};
				this.postal_codeId = data['result'][0]['postal_code'];
				this.postal_code_codeId = data['result'][0]['postalcode_code'];
				this.Prvnc = {name:data['result'][0]['province_name'],id:data['result'][0]['province_id']};
				this.Distr = {name:data['result'][0]['district_name'],id:data['result'][0]['district_id']};
				this.cty = {name:data['result'][0]['municipality_name'],id:data['result'][0]['municipality_id']};
				this.region_id = {name:data['result'][0]['region_name'],id:data['result'][0]['region_id']};
				//this.regionId.nativeElement.click()
			},
			err=>{
				
			},
			()=>{}
		)
	}
	
	showDialog() { 
		this.display = true;
	}
	
	submit() {
		this.submitted=true;
		var user_id = this.userDetails.userDet.id;
		this.namechkResErr = false;
		
		if(this.namechkRes == false && this.postal_code.valid){
			this.namechkResErr = true;
		}
		
		if(this.postal_code_codeId){
			this.postal_code_codeId = this.postal_code_codeId.trim();
		}
		
		if(this.Prvnc&&this.Distr&&this.cty&&this.subdistrict_id&&this.namechkRes == true&&(/^[0-9]+$/.test(this.postal_codeId) && (this.postal_codeId!=''))){
			let para={subdistrict_id: this.subdistrict_id.id,postal_code:this.postal_codeId,postalcode_code:this.postal_code_codeId,status:1,created_by:user_id, updated_by:user_id}
			this.busy=this.pcApi.addEditPostalcode(para,this.id).subscribe((Res)=>{
				this.result = "success";
				this.showDialog();
				setTimeout(()=>{
					  //this.router.navigate(['/postalcode']);
				},3000);
				
			},(userErr)=>{
				this.result = "Failed";	
				this.showDialog();
			});
		}
	}
	
	NameChange(name){
		name = name.trim();
		if(this.prevName != name){ // changed text is not same as the one in the db, only then fetch
			if(name.match(/^[0-9]+$/) && (name!='')){
				this.namechkRes = false;
				this.postal_code_codeId = '';
				this.busy=this.pcApi.postalcodeNamechek(name).subscribe((Res)=>{
					if(Res.result!=''){
						this.postal_code_codeId = name+'-'+( ( parseInt(Res.result[0].code.split('-')[1]) )+1 );
					}else{
						this.postal_code_codeId = name+'-'+1;
					}
					this.namechkRes = true;
					this.namechkResErr = false;
				},(userErr)=>{
					this.namechkRes = true;
				});
			}else{
				setTimeout(()=>{
					  this.postal_code_codeId = null;
				},10);
				this.namechkRes = true;
			}
		}else{
			this.postal_code_codeId = this.prevCode;
			this.namechkRes = true;
			this.namechkResErr = false;
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
		dataObj['municipalityTagged']='yes';
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
		dataObj['municipalityTagged']='yes';
		let fKeyName="province";
		let fVaue=query;
		this.provinceCall = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
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
		dataObj['municipalityTagged']='yes';
		let fKeyName="district";
		let fVaue=query;
		this.districtCall = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
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
		dataObj['municipalityTagged']='yes';
		let fKeyName="municipality";
		let fVaue=query;
		this.munCall = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allMun = dataRes['result']; 
			this.filteredMun = this.filterAutocompleteDisData(query, this.allMun,'name');
		});
	}
	
	filterSubDistrict(event){ 
		let query = event.query;
		if(this.subDisCall){
			this.subDisCall.unsubscribe();
		}
		let dataObj={};
		dataObj['region']=this.region_id?[this.region_id]:[];
		dataObj['province']=this.Prvnc?[this.Prvnc]:[];
		dataObj['district']=this.Distr?[this.Distr]:[];
		dataObj['municipality']=this.cty?[this.cty]:[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		dataObj['regionTagged']='yes';
		dataObj['provinceTagged']='yes';
		dataObj['districtTagged']='yes';
		dataObj['municipalityTagged']='yes';
		let fKeyName="subdistrict";
		let fVaue=query;
		this.subDisCall = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allSubDistrict = dataRes['result']; 
			this.filteredSubDistrict = this.filterAutocompleteDisData(query, this.allSubDistrict,'name');
		});
	}
	
	filterResetChildTax(fromName){
		setTimeout(()=>{
			let event={query:''}
			let forName='selected';
			if(fromName=="region"){
				this.Prvnc=null;
				this.Distr=null;
				this.cty=null;
				this.subdistrict_id=null;
			}else if(fromName=="province"){
				this.Distr=null;;
				this.cty=null;;
				this.subdistrict_id=null;
			}else if(fromName=="district"){
				this.cty=null;;
				this.subdistrict_id=null;
			}else if(fromName=="municipality"){
				this.subdistrict_id=null;
				
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
