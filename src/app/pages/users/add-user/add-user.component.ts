import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_usersApi,User_mapApi,RegionApi,ProvinceApi,DistrictApi,MunicipalityApi,SubdistrictApi,Postal_codeApi } from '../../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment'; //for date manupalation
import {ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
declare var window:any;
@Component({
	selector: "addUser",
	templateUrl: 'add-user.component.html',
	providers: [ConfirmationService]
})
 
export class AddUserComponent {

	submitted:any=false;
	@ViewChild('fullName') fullName: any; 
	@ViewChild('userNameMobile') userNameMobile: any; 
	@ViewChild('eMail') eMail: any; 
	@ViewChild('roleN') roleN: any;
	@ViewChild('password') paswd: any;
	userData: any = [];
	busy:any;
	roleList:any=[];

	region: any[];
	filteredRegionMultiple: any[];
	allRegions:any[];

	province: any[];
	filteredProvinceMultiple: any[];
	allProvince:any[];

	district: any[];
	filteredDistrictMultiple: any[];
	allDistrict:any[];

	municipality: any[];
	filteredMunicipalityMultiple: any[];
	allMunicipality:any[];

	subdistrict: any[];
	filteredSubDistrictMultiple: any[];
	allSubDistrict:any[];

	postalCode: any[];
	filteredPostalCodeMultiple: any[];
	allPostalCode:any[];
	emptyMessage:String="No Result Found";

	displayConfirm: boolean = false;
	roleId:any;

	relatedUsers:any=[];
	msgs: Message[] = [];
	msgsG: Message[] = [];
	
	uid:any=0;
	role:any=null;
	constructor(public router:Router,private confirmationService: ConfirmationService,private uApi: App_usersApi,public userMapApi:User_mapApi, private route: ActivatedRoute,public regionApi:RegionApi,public provinceApi:ProvinceApi,public districtApi:DistrictApi,public municipalityApi:MunicipalityApi,public subdistrictApi:SubdistrictApi,public postal_codeApi:Postal_codeApi) {
	//	this.roleList.push({label:'--Select--',value:null});
		this.route.queryParams.subscribe(params => {
			if(params["role"] == "$sa"){
				this.roleList.push({label:'SA',value:"$sa"});
				this.role = "$sa";
				this.roleId = 16;
			}else{
				this.roleList.push({label:'SPH',value:"$sph"});
				this.roleList.push({label:'TLH',value:"$tlh"});
				this.roleList.push({label:'AC',value:"$ac"});
				this.roleList.push({label:'AM',value:"$am"});
				this.roleList.push({label:'RA',value:"$ra"});
			}
		});
	}

	ngOnInit(): void {
		let dataObj={};
		this.postalCode=[];
		this.subdistrict=[];
		this.municipality=[];
		this.district=[]; 
		this.province=[];
		this.region=[]; 
	}

	userSubmit(){

		this.userSubmitConfirm();

		// if(this.submited){
		// 	this.userSubmitConfirm();
		// }else{	
		// 	this.confirmationService.confirm({
		// 		message: 'Are you sure that you want to proceed?',
		// 		header: 'Confirmation',
		// 		icon: 'fa fa-question-circle',
		// 		accept: () => {
		// 			  //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
		// 			this.userSubmitConfirm();
		// 		},
		// 		reject: () => {
		// 		   // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
		// 			this.userSubmitReject();
		// 		}
		// 	});
		// }
	}

	userSubmitConfirm(){
		this.msgs = [];
		this.submitted=true;
		let validFlag=true;
		if(!this.fullName.valid){
			validFlag=false;
			//this.msgs.push({severity:'error', summary:'Error Message', detail:'Please enter Valid FullName'});
		}
		if(!this.userNameMobile.valid){
			validFlag=false;
			//this.msgs.push({severity:'error', summary:'Error Message', detail:'Please enter Valid Mobile no.'});
		}
		if(!this.eMail.valid){
			validFlag=false;
			//this.msgs.push({severity:'error', summary:'Error Message', detail:'Please enter Valid email'});
		}

		if(!this.roleN.valid){
			validFlag=false;
			//this.msgs.push({severity:'error', summary:'Error Message', detail:'Please select role'});
		}

		if(this.role !='$sph' && this.role !='$am' && !this.paswd.valid){
			validFlag=false;
			//this.msgs.push({severity:'error', summary:'Error Message', detail:'Please select role'});
		}

		if(this.role=='$sph' && this.postalCode['length']==0){
			validFlag=false;
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Please enter valid SPH Postal Code'});
		}else if(this.role=='$tlh' && this.subdistrict['length']==0){
			validFlag=false;
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Please enter valid TLH Sub District'});
		}else if(this.role=='$ac' && this.district['length']==0){
			validFlag=false;
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Please enter valid AC District'});
		}else if(this.role=='$am' && this.region['length']==0){
			validFlag=false;
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Please enter valid AM Region'});
		}else if(this.role=='$ra' && this.region['length']==0){
			validFlag=false;
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Please enter valid RA Region'});
		}

		if(validFlag){
			this.msgs=[];
			this.msgsG=[];
			let dataObj={};
			dataObj['name']=this.userData.user_name;
			dataObj['mobile']=this.userData.mobile;
			dataObj['email']=this.userData.email;
			dataObj['role']=this.role;
			if(this.role != "$sa"){
				dataObj['postalCode']=this.postalCode;
				dataObj['subdistrict']=this.subdistrict;
				dataObj['municipality']=this.municipality;
				dataObj['district']=this.district;
				dataObj['province']=this.province;
				dataObj['region']=this.region;
			}
			if(this.role == "$sph" || this.role == "$am"){
				dataObj['password']="";
			}else{
				dataObj['password']=this.userData.password;
			}
			this.busy = this.userMapApi.userMapAddEdit(dataObj,this.uid).subscribe((respD:any)=>{
				if(respD){
					var newRespD=respD['result'];
					if(newRespD['status']){
						this.msgsG.push({severity:'success', summary:'Success Message', detail:'User submited successfully.'});
						let nuid=newRespD['uid'];
						let nrole=newRespD['rolename'];
						//this.editUser(nuid,nrole);
						setTimeout(()=>{
							//window.location.reload();
							this.router.navigate(["users/view-user",nuid,nrole]);
						},10);
					}else{
						// console.log("InsideError");
						// console.log("respd",respD);
						this.msgsG.push({severity:'warn', summary:'Error Message', detail:newRespD['message']});			
					}

				}else{
					// console.log("OutsideRSPD");
					this.msgsG.push({severity:'warn', summary:'Error Message', detail:'Somthing went wrong. Please try again later.'});			
				}
			},(error)=>{
				// console.log('OutsideError',error);
				this.msgsG.push({severity:'warn', summary:'Error Message', detail:'Somthing went wrong. Please try again later.'});
			});
		}else{
			return false;
		}
	}

	userSubmitReject(){

	}

	filterAutocompleteData(query, filterAllData: any[],keyName):any[] {
		let filtered : any[] = [];
		for(let i = 0; i < filterAllData.length; i++) {
			let currData = filterAllData[i];
			if(query=='' || query==null){
				filtered.push(currData);
				if(i==10){
					break;
				}
			}else if(currData[keyName].toString().toLowerCase().includes(query.toLowerCase())) {
					filtered.push(currData);
			}
		}
		return filtered;
	}


	/* Region : Start */
	
	filterRegionMultiple(event,forName) {
		// console.log('filterRegionMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=[];
		dataObj['district']=[];
		dataObj['municipality']=[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		let fKeyName="region";
		let fVaue=query;
		// console.log('dataObj',dataObj)
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allRegions = dataRes['result']; 
			if(forName=='selected'){
				this.region=this.allRegions;
			}else{
				this.filteredRegionMultiple=dataRes['result'];
			}
			
			//this.filteredRegionMultiple = this.filterAutocompleteData(query, this.allRegions,'name');
		});
	}

	filterRegionMultipleSelect(selectedData) {
		this.filterResetChildTax('region');

    }
 
	filterRegionMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('region');
	}
	/* Region : End */

	/* Province : Start */
	
	filterProvinceMultiple(event,forName) {
		// console.log('filterProvinceMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=[];
		dataObj['municipality']=[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		let fKeyName="province";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allProvince = dataRes['result']; 
		if(forName=='selected'){
			this.province=this.allProvince;
		}else{
			this.filteredProvinceMultiple = dataRes['result']; 
		}
		
		//this.filteredProvinceMultiple = this.filterAutocompleteData(query, this.allProvince,'name');
		});
	}

	filterProvinceMultipleSelect(selectedData) {
		this.filterResetChildTax('province');
	}

	filterProvinceMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('province');
	}
	/* Province : End */
	/* District : Start */
	
	filterDistrictMultiple(event,forName) {
		// console.log('filterDistrictMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		let fKeyName="district";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allDistrict = dataRes['result'];
		if(forName=='selected'){
			this.district=this.allDistrict;
		}else{
			this.filteredDistrictMultiple=dataRes['result'];
		}
		
		//this.filteredDistrictMultiple = this.filterAutocompleteData(query, this.allDistrict,'name');
		});
	}

	filterDistrictMultipleSelect(selectedData) {
		this.filterResetChildTax('district');
	}

	filterDistrictMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('district');
	}
	/* District : End */
	/* Municipality : Start */
	
	filterMunicipalityMultiple(event,forName) {
		// console.log('filterMunicipalityMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=this.municipality?this.municipality:[];
		dataObj['subdistrict']=[];
		dataObj['postalcode']=[];
		let fKeyName="municipality";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allMunicipality = dataRes['result'];
		if(forName=='selected'){
			this.municipality=this.allMunicipality;
		}else{
			this.filteredMunicipalityMultiple = dataRes['result'];
		}
		
		//this.filteredMunicipalityMultiple = this.filterAutocompleteData(query, this.allMunicipality,'name');
		});
	}

	filterMunicipalityMultipleSelect(selectedData) {
		this.filterResetChildTax('municipality');
	}

	filterMunicipalityMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('municipality');
	}
	/* Municipality : End */
	/* SubDistrict : Start */

	filterSubDistrictMultiple(event,forName) {
		// console.log('filterSubDistrictMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=this.municipality?this.municipality:[];
		dataObj['subdistrict']=this.subdistrict?this.subdistrict:[];
		dataObj['postalcode']=this.postalCode?this.postalCode:[];
		let fKeyName="subdistrict";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allSubDistrict = dataRes['result']; 
		if(forName=='selected'){
			this.subdistrict=this.allSubDistrict;
		}else{
			this.filteredSubDistrictMultiple = dataRes['result']; 
		}
		
		//this.filteredSubDistrictMultiple = this.filterAutocompleteData(query, this.allSubDistrict,'name');
		});
	}

	filterSubDistrictMultipleSelect(selectedData) {
		this.filterResetChildTax('subdistrict');
	}

	filterSubDistrictMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('subdistrict');
	}
	/* SubDistrict : End */	
	/* PostalCode : Start */
	
	filterPostalCodeMultiple(event,forName) {
		console.log('filterPostalCodeMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=this.municipality?this.municipality:[];
		dataObj['subdistrict']=this.subdistrict?this.subdistrict:[];
		dataObj['postalcode']=this.postalCode?this.postalCode:[];
		let fKeyName="postalcode";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allPostalCode  = dataRes['result']; 
		if(forName=='selected'){
			this.postalCode=this.allPostalCode;
		}else{
			this.filteredPostalCodeMultiple  = dataRes['result']; 
		}
		
		//this.filteredPostalCodeMultiple = this.filterAutocompleteData(query, this.allPostalCode,'postal_code');
		});
	}

	filterPostalCodeMultipleSelect(selectedData) {
		this.filterResetChildTax('postalcode');
	}

	filterPostalCodeMultipleUnSelect(unselectedData) {
		this.filterResetChildTax('postalcode');
	}
	/* PostalCode : End */		

	filterAddCloseTax(fromName,forName){
		let event={query:''}
		let forNName='selected';
		if(fromName=="region" && forName=="remove"){
			this.region=[];
			this.province=[];
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="region" && forName=="add"){
			this.province=[];
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
			
			this.filterProvinceMultiple(event,forNName);
		}

		if(fromName=="province" && forName=="remove"){
			this.province=[];
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="province" && forName=="add"){
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
			
			this.filterDistrictMultiple(event,forNName);
		}

		if(fromName=="district" && forName=="remove"){
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="district" && forName=="add"){
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
			this.filterMunicipalityMultiple(event,forNName);
		}

		if(fromName=="municipality" && forName=="remove"){
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="municipality" && forName=="add"){
			this.subdistrict=[];
			this.postalCode=[];
			this.filterSubDistrictMultiple(event,forNName);
		}

		if(fromName=="subdistrict" && forName=="remove"){
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="subdistrict" && forName=="add"){
			this.postalCode=[];
			this.filterPostalCodeMultiple(event,forNName);
		}

		if(fromName=="postalcode" && forName=="remove"){
			this.postalCode=[];
		}else if(fromName=="postalcode" && forName=="add"){
			this.postalCode=[];
			this.filterPostalCodeMultiple(event,forNName);
		}
	}

	filterResetChildTax(fromName){

		// console.log('fromName',fromName);
		setTimeout(()=>{

		let event={query:''}
		let forName='selected';
		if(fromName=="region"){
			this.province=[];
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
			// console.log('this.region.length',this.region.length);
			if(this.region.length>0){
			//	this.filterProvinceMultiple(event,forName);
			}
		}else if(fromName=="province"){
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
			// console.log('this.province.length',this.province.length);
			if(this.province.length>0){
			//	this.filterDistrictMultiple(event,forName);
			}
		}else if(fromName=="district"){
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
			// console.log('this.district.length',this.district.length);
			if(this.district.length>0){
			//	this.filterMunicipalityMultiple(event,forName);
			}
		}else if(fromName=="municipality"){
			this.subdistrict=[];
			this.postalCode=[];
			// console.log('this.municipality.length',this.municipality.length);
			if(this.municipality.length>0){
			//	this.filterSubDistrictMultiple(event,forName);
			}
			
		}else if(fromName=="subdistrict"){
			this.postalCode=[];
			// console.log('this.subdistrict.length',this.subdistrict.length);
			if(this.subdistrict.length>0){
			//	this.filterPostalCodeMultiple(event,forName);
			}
		}else if(fromName=="postalcode"){
			
		}

	    },10);


	}
	
	// editUser(id,role){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 			"role": role,
	// 		}
	// 	};  
	// 	this.router.navigate(["users/view-user"], navigationExtras);
	// }

	roleNameParse(roleName){
		let newroleName = roleName.replace("$","");
		newroleName = newroleName.toString().toUpperCase();
		return newroleName;
	}
}