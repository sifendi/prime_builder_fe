import { Component, OnInit, Injectable } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { App_rdsApi,SubdistrictApi,MunicipalityApi,LoopBackAuth } from '../../../shared/loopback_sdk';
import { ExcelService } from 'providers/services/services';


@Component({
  templateUrl: 'rds.component.html'
})
export class RdsComponent {
	subDistrictErrors: boolean;
	cityErrors: boolean;
	holcimIdErrors: boolean;
	display: boolean=false;
	busy:any;
	rdsData:any;
	total:Number=0;
	paginationVal:any=true;
	offset:Number=0;
	rdsType:any = "";
	rdsName:any;
	sdData:any;
	rdssbdstrct:any;
	rdscity:any;
	user_id:any;
	rolename:any;
	role:any;
	ifEmpty:boolean=false;
	loading:boolean=true;
	exportDataErr:any = "";
	rds_id:any;
	
	allSubDistrict:any=[];
	allCities:any=[];
	filteredSubDistrict:any=[];
	filteredCity:any=[];
	sCall:any;
	allHolcimId:any=[];
	filteredHolcimId:any=[];
	hIdCall:any;
	exportData:any = [];

	rdscitySearch: any="";
	rds_idSearch: any="";
	rdssbdstrctSearch: any="";
	rdsTypeSearch: any="";
	rdsNameSearch: any="";
	perPageLimit:any=10;
	offsetAuto:any=0;
	
	constructor(private muApi:MunicipalityApi,private service:ExcelService,private sdApi:SubdistrictApi,private rdsApi:App_rdsApi, private router: Router,private loopAuth:LoopBackAuth) {}
	
	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};  
		this.router.navigate(["edit-rds"], navigationExtras);
	}

	// view(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 		}
	// 	};  
	// 	this.router.navigate(["view-rds"], navigationExtras);
	// }

	ngAfterViewInit(): void {
		let userDetails = this.loopAuth.getCurrentUserData();
		let rolename;
		if(userDetails.userDet!==""){
		 	rolename = userDetails.userDet.roles[0].name;
		 	this.role = userDetails.userDet.roles[0].name;
		}
		var user_id;
		if(rolename == "$ra"){
			this.user_id = userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.getCount(10,0,"","","",null,null);
	}

	paginate(event) {
		this.ifEmpty = false;
		this.offset=event.page;
		let rds_id = null;
		if(this.rds_idSearch){
			rds_id = this.rds_idSearch.id;
		}
		let rdsCity = null;
		if(this.rdscitySearch){
			rdsCity = this.rds_idSearch.id;
		}
		this.getData(10,this.offset,this.rdsNameSearch,this.rdsTypeSearch,this.rdssbdstrctSearch,rds_id,rdsCity);
		this.rdsData = [];
	}

	searchData(){
		this.holcimIdErrors = false;
		this.cityErrors = false;
		this.subDistrictErrors = false;
		if(this.rds_id){
			if(this.rds_id.id != undefined && this.rds_id.id != ""){
				this.holcimIdErrors = false;
		   }else{
				this.holcimIdErrors = true;
		   }
		}
		if(this.rdscity){
			if(this.rdscity.id != undefined && this.rdscity.id != ""){
				this.cityErrors = false;
		   }else{
				this.cityErrors = true;
		   }
		}
		if(this.rdssbdstrct){
			if(this.rdssbdstrct.id != undefined && this.rdssbdstrct.id != ""){
				this.subDistrictErrors = false;
		   }else{
				this.subDistrictErrors = true;
		   }
		}
		if(!this.holcimIdErrors && !this.cityErrors && !this.subDistrictErrors){
			this.rdsNameSearch = this.rdsName;
			this.rdsTypeSearch = this.rdsType;
			this.rdssbdstrctSearch = this.rdssbdstrct;
			this.rds_idSearch = this.rds_id;
			this.rdscitySearch = this.rdscity;
			this.ifEmpty = false;
			this.rdsData = [];
			this.paginationVal=false;
			this.offset = 0;
			this.exportDataErr = "";
			this.getCount(10,0,this.rdsNameSearch,this.rdsTypeSearch,this.rdssbdstrctSearch,this.rds_idSearch,this.rdscitySearch);
		}
	}

	getCount(limit,offset,rdsName,rdsType,rdssbdstrct,rds_id,rdscity){
		let subdstrct={};
		console.log("rdsType", rdsType);
		if(rdssbdstrct){
			subdstrct={ "subDistrict":rdssbdstrct.id };
		}
		if(rdscity){
			rdscity = rdscity.id;
		}
		if(rdsType==undefined || rdsType==""){
			rdsType = "";
	   	}
	   	if(rdsName==undefined ||rdsName==""){
			rdsName = "";
		}
	   	if(this.user_id==undefined ||this.user_id==""){
		   this.user_id = "";
		}
		if(rds_id){
			rds_id = rds_id.id;
		}
		this.busy = this.rdsApi.getRdsCount(rds_id,subdstrct,"","",this.user_id,this.rolename,rdscity,rdsType,rdsName).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(limit,offset,rdsName,rdsType,rdssbdstrct,rds_id,rdscity);
			},
			err=>{},	
			()=>{}
		)
	}

	getData(limit,offset,rdsName,rdsType,rdssbdstrct,rds_id,rdscity){
		let subdstrct={};
		if(rdssbdstrct){
			subdstrct={ "subDistrict":rdssbdstrct.id };
		}
		this.busy = this.rdsApi.getRds(rds_id,subdstrct,limit,offset,this.user_id,this.rolename,rdscity,rdsType,rdsName).subscribe(
			data=>{
				this.loading = false;
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<dataLength; i++){
					var subDistrict = data.result[i]['subdistrict'];
					data.result[i]['subdistrictList'] = "";
					var subDistrictList = "";
					for(var j=0; j<subDistrict.length; j++){
						if(j+1 == subDistrict.length){
							subDistrictList+=data.result[i]['subdistrict'][j]['name'];
							data.result[i]['subdistrictList'] = subDistrictList;
						}else{
							subDistrictList+=data.result[i]['subdistrict'][j]['name']+",";
						}
					}

					var rdsCity = data.result[i]['municipality'];
					data.result[i]['municipalityList'] = "";
					var municipalityList = "";
					for(var j=0; j<rdsCity.length; j++){
						if(j+1 == rdsCity.length){
							municipalityList+=data.result[i]['municipality'][j]['name'];
							data.result[i]['municipalityList'] = municipalityList;
						}else{
							municipalityList+=data.result[i]['municipality'][j]['name']+",";
						}
					}
				}
				this.rdsData = data.result;
			},
			err=>{
			},
			()=>{

			}
		)
	}

	resetData(){
		this.paginationVal=false;
		this.rdsData = [];
		this.ifEmpty = false;
		this.rdsType = "";
		this.rdsName = "";
		this.offset = 0;
		this.rdscity = "";
		this.rdssbdstrct = "";
		this.rds_id = null;

		this.rdsTypeSearch = "";
		this.rdsNameSearch = "";
		this.rdscitySearch = "";
		this.rdssbdstrctSearch = "";
		this.rds_idSearch = null;

		this.holcimIdErrors = false;
		this.cityErrors = false;
		this.subDistrictErrors = false;

		this.getCount(10,this.offset,"","","",null,"");
	}

	filterSubDistrict(event){ 
		let query = event.query;
		if(this.sCall){
			this.sCall.unsubscribe();
		}
		this.sCall = this.busy = this.sdApi.getSubDistrict(this.perPageLimit,this.offsetAuto,null,query).subscribe((dataRes)=>{
			this.allSubDistrict = dataRes['result']; 
			this.filteredSubDistrict = this.filterAutocompleteDisData(query, this.allSubDistrict,'name');
		});
	}

	filterCity(event){ 
		let query = event.query;
		if(this.sCall){
			this.sCall.unsubscribe();
		}
		this.sCall = this.busy = this.muApi.getMunicipality(null,this.perPageLimit,this.offsetAuto,query,null).subscribe((dataRes)=>{
			this.allCities = dataRes['result']; 
			this.filteredCity = this.filterAutocompleteDisData(query, this.allCities,'name');
		});
	}

	filterHolcimId(event){ 
		let query = event.query;
		if(this.hIdCall){
			this.hIdCall.unsubscribe();
		}
		this.hIdCall = this.busy = this.rdsApi.getRds(null,null,this.perPageLimit,this.offsetAuto,null,null,null,null,null,query).subscribe((dataRes)=>{
			this.allHolcimId = dataRes['result']; 
			this.filteredHolcimId = this.filterAutocompleteDisData(query, this.allHolcimId,'holcim_id');
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

	// Download CSV Sample Code
	download(){
		this.exportData= [];
		let createdBy = null;
		let search = false;
		if(this.rdsTypeSearch==undefined ||this.rdsTypeSearch==""){
			 this.rdsTypeSearch = "";
		}else{
			search = true;
		}

		if(this.rdsNameSearch==undefined ||this.rdsNameSearch==""){
			this.rdsNameSearch = "";
	   	}else{
			search = true;
		}

		if(this.user_id==undefined ||this.user_id==""){
			this.user_id = "";
	   	}else{
			search = true;
		}

		let subdstrct={};
		if(this.rdssbdstrctSearch){
			subdstrct={ "subDistrict":this.rdssbdstrctSearch.id };
			search = true;
		}

		let rds_id = null;
		if(this.rds_idSearch){
			rds_id = this.rds_idSearch.id;
			search = true;
		}

		let rdsCity = null;
		if(this.rdscitySearch){
			rdsCity = this.rdscitySearch.id;
			search = true;
		}

		this.exportDataErr = null;
		if(search == true){
			this.busy = this.rdsApi.getRdsExport("",subdstrct,null,null,this.user_id,this.rolename,rdsCity,this.rdsType,this.rdsName,rds_id).subscribe(
				data=>{
					var dataLength = data.result.length;

					for(var i=0; i<dataLength; i++){
						var arr = {'RDS Name':data.result[i].rds_name, 'RDS Mobile':data.result[i].rds_mobile, 'Type':data.result[i].rds_type, 'Holcim Id':data.result[i].holcim_id, 'Address':data.result[i].rds_address,'City / Municipality':data.result[i].municipality_name, 'Subdistrict':data.result[i].subdistrict_name};
						(this.exportData).push(arr);
					}

					//Function Call
					this.service.makeExcel(this.exportData,"rdsData.xlsx");
				},
				err=>{},
				()=>{}
			);
		}else{
			this.display = true;
			this.loading = false;
			this.exportDataErr = "Please apply search criteria before exporting";
		}
	}
}