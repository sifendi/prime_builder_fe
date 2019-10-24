import { Component, OnInit,ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { DistrictApi,RegionApi, ProvinceApi, LoopBackAuth,User_mapApi }   from '../../../shared/loopback_sdk';
@Component({
  templateUrl: 'edit-district.component.html'
})
export class EditDistrictComponent {
	@ViewChild('provinceId') provinceId: NgModel;
	@ViewChild('regionId') regionId: NgModel;
	
	@ViewChild('name') name: NgModel;
	@ViewChild('code') code: NgModel;
	
	display:boolean = false;
	submitted:boolean=false;
	result:any;
	
	distName:any;
	distCode:any;
	Prvnc:any;
	region_id:any;
	
	userDetails:any;
	rolename:any;
	namechkRes:boolean= false;
	namechkResErr:boolean= false;
	
	allRegion:any=[];
	filteredRegion:any=[];
	regionCall:any;
	
	allProvince:any=[];
	filteredProvince:any=[];
	provinceCall:any;
	
	
	perPageLimit:any=10;
	offsetAuto:any=0;

	prevName:any;
	prevCode:any;
	
	busy:any;
	id:any;
	nameChange:any;
	
	constructor(private loopAuth:LoopBackAuth,private dApi:DistrictApi,private provinceApi:ProvinceApi, private regionApi:RegionApi, private router: ActivatedRoute,private userMapApi:User_mapApi){
		// this.router.queryParams.subscribe(params => {
			// this.id = params["id"];
		// });
		this.id = this.router.snapshot.params['id'];
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
		if(this.distName){
			this.distName = this.distName.trim();
		}
		if(this.distName&&this.Prvnc&&this.code.valid&&this.namechkRes == true&&(this.distName.match(/^[a-zA-Z0-9 ]+$/) && (this.distName!=''))){
			let para={name: this.distName,province_id:this.Prvnc.id,district_code:this.code.value, status:1,  created_by:user_id, updated_by:user_id};
			this.busy = this.dApi.addEditDistrict(para,this.id).subscribe((Res)=>{
				this.result = "success";
				this.display = true;
			},(userErr)=>{
				this.result = "failed";
				this.display = true; 
			});
		}
	}
	ngOnInit(): void {
		this.dApi.getDistrict("","",this.id).subscribe(
			data=>{
				this.distName = data.result[0]['name'];
				this.distCode = data.result[0]['district_code'];
				
				this.prevName = data.result[0]['name'];
				this.prevCode = data.result[0]['district_code'];
				
				this.Prvnc = {name:data['result'][0]['province'],id:data['result'][0]['province_id']};
				this.region_id = {name:data['result'][0]['region_name'],id:data['result'][0]['region_id']};
			},
			err=>{

			},
			()=>{

			}
		)
	}

	NameChange(name){
		name = name.trim();
		if(name != this.prevName){
			if(name.match(/^[a-zA-Z0-9 ]+$/) && (name!='')){
				this.namechkRes = false;
				this.distCode = '';
				if(this.nameChange){
					this.nameChange.unsubscribe();
				}
				this.nameChange = this.busy = this.dApi.districtNamechek(name).subscribe((Res)=>{
					if(Res.result!=''){
						this.distCode = name+'-'+( ( parseInt(Res.result[0].district_code.split('-')[1]) )+1 );
					}else{
						this.distCode = name+'-'+1;
					}
					this.namechkRes = true;
					this.namechkResErr = false;
				},(userErr)=>{
					this.namechkRes = true;
				});
			}else{
				this.distCode = null;
				this.namechkRes = true;
				setTimeout(()=>{
					  this.distCode = null;
				},20);
			}
		}else{
			this.distCode = this.prevCode;
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
		let fKeyName="province";
		let fVaue=query;
		this.provinceCall  = this.busy = this.userMapApi.getMappingForMaster(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allProvince = dataRes['result']; 
			this.filteredProvince = this.filterAutocompleteDisData(query, this.allProvince,'name');
		});
	}
	
	filterResetChildTax(fromName){
		setTimeout(()=>{
			let event={query:''}
			let forName='selected';
			if(fromName=="region"){
				this.Prvnc=null;
			}
	    },10);
	}
	
	filterRegionMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('region');
	}
	filterProvinceMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('province');
	}
	
	filterRegionMultipleSelect(unselectedData) {
		this.filterResetChildTax('region');
	}
	filterProvinceMultipleSelect(unselectedData) {
		this.filterResetChildTax('province');
	}
}