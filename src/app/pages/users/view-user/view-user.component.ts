import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_usersApi,LoopBackAuth,User_mapApi,App_loginApi,RegionApi,ProvinceApi,DistrictApi,MunicipalityApi,SubdistrictApi,Postal_codeApi } from '../../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment'; //for date manupalation
import {ConfirmationService} from 'primeng/primeng';
import {Message,MenuItem,SelectItem} from 'primeng/primeng';
declare var window:any;
declare var $;
@Component({
	selector: "viewUser",
	templateUrl: 'view-user.component.html',
	providers: [ConfirmationService],
	styles: [`
		.disabledDiv {
			pointer-events: none;
		}
	`]
})

export class ViewUserComponent {
	result: any;
	success: boolean;
	display: boolean;
	public id: number;
	public role: string;
	submited:any=false;
	@ViewChild('fullName') fullName: any; 
	@ViewChild('userNameMobile') userNameMobile: any; 
	@ViewChild('eMail') eMail: any; 

	userData: any = [];
	backLink:any = "";
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
	currUserId: any;
	postalCode: any[];
	filteredPostalCodeMultiple: any[];
	allPostalCode:any[];
	emptyMessage:String="No Result Found";

	displayConfirm: boolean = false;

	userDetails:any;

	relatedUsers:any=[];
	relatedUsersAM:any=[];
	relatedUsersAC:any=[];
	relatedUsersTLH:any=[];
	relatedUsersSPH:any=[];
	relatedUsersRA:any=[];
	msgs: Message[] = [];
	msgsG: Message[] = [];
	itemsActions: MenuItem[];
	displaySwapTransferDi: boolean = false;
	displaySwapTransferDiSu:boolean = false;
	userSwapTransferSel:any;
	filteredUserSwapTransfer:any=[];
	typesUserSwapTran: SelectItem[];
	selectedTypeUserSwapTran:any;
	constructor(private router:Router,private confirmationService: ConfirmationService,private uApi: App_usersApi,private appLoginApi:App_loginApi,private loopAuth:LoopBackAuth,public userMapApi:User_mapApi, private route: ActivatedRoute,public regionApi:RegionApi,public provinceApi:ProvinceApi,public districtApi:DistrictApi,public municipalityApi:MunicipalityApi,public subdistrictApi:SubdistrictApi,public postal_codeApi:Postal_codeApi) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// 	this.role = params["role"];
		// });
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.currUserId = this.userDetails.id;
		this.id = this.route.snapshot.params['id'];
		this.role = this.route.snapshot.params['role'];
		this.roleList.push({label:'SPH',value:"$sph"});
		this.roleList.push({label:'TLH',value:"$tlh"});
		this.roleList.push({label:'AC',value:"$ac"});
		this.roleList.push({label:'AM',value:"$am"});
		this.roleList.push({label:'SA',value:"$sa"});
		this.roleList.push({label:'RA',value:"$ra"});

		this.typesUserSwapTran = [];
        this.typesUserSwapTran.push({label: 'Swap / Transfer User', value: 'swap_transfer'});
        this.typesUserSwapTran.push({label: 'User Inactive and Data Transfer to Other User', value: 'inactive_transfer_data'});
	}

	initAction(){
		let actInLable='Active / Inactive';
		if(this.userData['status']==1){
			actInLable="InActive";
		}else{
			actInLable="Active";
		}

		this.itemsActions = [
            // {label: 'Edit', icon: 'fa-pencil-square-o', command: () => {
            //     this.editClick();
            // }},
            {label: actInLable, icon: 'fa-check', command: () => {
                this.activeInactiveClick();
            }},
            {label: 'Reset History', icon: 'fa-close', command: () => {
                this.resetHistoryClick();
            }}
        ];
	}

	ngOnInit(): void {
		//console.log(this.role);
		if(this.role == "$tlh"){
			this.backLink = "/users/tlh";
		}else if(this.role == "$sph"){
			this.backLink = "/users/sph";
		}else if(this.role == "$ac"){
			this.backLink = "/users/ac";
		}else if(this.role == "$am"){
			this.backLink = "/users/am";
		}else if(this.role == "$ra"){
			this.backLink = "/users/ra";
		}else if(this.role == "$sa"){
			this.backLink = "/users/sa";
		}
		//console.log(this.backLink);
		let dataObj={};
		let uid=this.id;
		this.busy=this.userMapApi.getRelatedUser(dataObj,uid).subscribe((respData:any)=>{
			this.relatedUsers = respData['result'] || [];
			for(let i=0;i<this.relatedUsers.length;i++){
				let userObj = this.relatedUsers[i];
				if(userObj['rolename']=='$am'){
					this.relatedUsersAM.push(userObj);
				}else if(userObj['rolename']=='$ac'){
					this.relatedUsersAC.push(userObj);
				}else if(userObj['rolename']=='$tlh'){
					this.relatedUsersTLH.push(userObj);
				}else if(userObj['rolename']=='$sph'){
					this.relatedUsersSPH.push(userObj);
				}else if(userObj['rolename']=='$ra'){
					this.relatedUsersRA.push(userObj);
				}
			}
			console.log('this.relatedUsers',this.relatedUsers );
		},(error)=>{
			console.log('getRelatedUser error',error);
		});

		this.busy=this.uApi.getUsersDashboardDetail(this.role,this.id).subscribe(
			data=>{
				if(data.result.length>0){
				if(Object.keys(data.result[0]).length>0){
					// push all subdistricts together
					if(this.role != "$sa"){
						this.region = data.result[0]['region'];
						this.district = data.result[0]['district'];
						this.province = data.result[0]['province'];
						this.municipality = data.result[0]['municipality'];
						this.subdistrict = data.result[0]['subdistrict'];
						this.postalCode = data.result[0]['postal_code'];
					}
					this.userData = data.result[0];
					console.log("USERDATA",this.userData);
					this.initAction();
				}
			}
				//this.role = this.role.replace("$","");
			},
			err=>{

			},
			()=>{

			}
		);
	}

	// editClick(){
	// 	//alert('editClick');
	// 	this.editUser();
	// }

	swapTransferClick(){
		//alert('swapTransferClick');
		this.selectedTypeUserSwapTran=null;
		this.userSwapTransferSel=null;
		this.displaySwapTransferDi=true;

	}
	swapTransferCancelClick(){
		//alert('swapTransferClick');
		this.displaySwapTransferDi=false;
	}

	swapTransferSubmitClick(){
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'fa fa-question-circle',
			accept: () => {
			  // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
			  this.swapTransferSubmitConfirm();
			},
			reject: () => {
			 // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
		});
	}

	reloadPageC(){
		window.location.reload();
	}

	swapTransferSubmitConfirm(){ 
		//alert('swapTransferClick');
		//this.displaySwapTransferDi=true;
		//alert('Submited...');
		let uid=this.id;
		let tuid=this.userSwapTransferSel['id'];
		let dataObj={}; 
		dataObj['action_type']=this.selectedTypeUserSwapTran;
		this.busy=this.userMapApi.userSwapTransfer(dataObj,uid,tuid).subscribe((respD:any)=>{
			//console.log('respD',respD);
			
			this.msgsG=[];
			if(respD['result']['status']){
				//this.msgsG.push({severity:'success', summary:'Success Message', detail:'Successfully Done. Please ask your users to clear the app data before using it,otherwise data will be miss matched.'});
				this.displaySwapTransferDi=false;
				this.displaySwapTransferDiSu=true;
			}else{
				this.msgsG.push({severity:'warn', summary:'Error Message', detail:respD['result']['message']});
			}
		},(error)=>{
			//console.log('error',error);
			this.msgsG=[];
			this.msgsG.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
			this.displaySwapTransferDi=false;
		});
	}

	filterUserSwapTransferCM(event){
		let query = event.query;
		let type = this.roleNameParse(this.role);
		this.uApi.getUsersDashboard(null,type,query,50,0).subscribe((dataRes)=>{
			let resultUserName = dataRes['result']; 
			this.filteredUserSwapTransfer = this.filterAutocompleteUserData(query,resultUserName,'realm');
		});
	}

	filterAutocompleteUserData(query, filterAllData: any[],keyName):any[] {
		let filtered : any[] = [];
		for(let i = 0; i < filterAllData.length; i++) {
			let currData = filterAllData[i];
			if(this.id!=currData['id']){
				if(query=='' || query==null){
					filtered.push(currData);
					if(i==50){
						break;
					}
				}else if(currData[keyName].toString().toLowerCase().includes(query.toLowerCase())) {
					  filtered.push(currData);
				}
			}
		} 
		return filtered;
	}

	activeInactiveClick(){
	//	alert('activeInactiveClick');
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'fa fa-question-circle',
			accept: () => {
			  // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
			  this.activeInactiveSubmit();
			},
			reject: () => {
			 // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
		});
	}

	activeInactiveSubmit(){
		let dataObj={};
		if(this.userData['status']==1){
			dataObj['status']=0;
		}else{
			dataObj['status']=1;
		}
		let uid=this.id;
		this.msgs.length=0;
		this.busy = this.userMapApi.userStatusChange(dataObj,uid).subscribe((respData:any)=>{
			//console.log('respData',respData);
			if(respData['result']['status']){
				this.msgs.push({severity:'success', summary:'Success Message', detail:'User Status Submited Successfully.'});
				
				setTimeout(()=>{
					window.location.reload();
				},1000);

			}else{
				this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
			}
		},(error)=>{
			//console.log('respData error',error);
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
		});
	}

	resetHistoryClick(){
		//alert('resetHistoryClick');
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'fa fa-question-circle',
			accept: () => {
			    //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
				this.resetUserSubmit();
			},
			reject: () => {
				// this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
		});
	}

	resetUserSubmit(){
		let dataObj={};
		
		dataObj['reset']="1";
		//dataObj['status']="0";
		let uid=this.id;
		this.msgs.length=0;
		this.busy = this.userMapApi.userResetHistory(dataObj,uid).subscribe((respData:any)=>{
			//console.log('respData',respData);
			if(respData['result']['status']){
				this.msgs.push({severity:'success', summary:'Success Message', detail:'User History Reset Successfully.'});
			}else{
				this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
			}
		},(error)=>{
			//console.log('respData error',error);
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
		});
	}

	resetPasswordClick(){
		//alert('resetHistoryClick');
		this.confirmationService.confirm({
			message: 'Are you sure that you want to Reset Password?',
			header: 'Confirmation',
			icon: 'fa fa-question-circle',
			accept: () => {
			    //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
				this.resetUserPassword();
			},
			reject: () => {
				// this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
		});
	}

	resetUserPassword(){
		let flagType = '';
		let typeData = '';
		let email = this.userData.email;
		let mobile = this.userData.username;

		if(email != ''){
			flagType = 'email';
			typeData = email;
		}else{
			flagType = 'mobile';
			typeData = mobile;
		}

		let credsObj={type:flagType,type_data:typeData,role:"HPB"};
		this.busy=this.appLoginApi.userResetOrForgotPassActionCheckReq(credsObj).subscribe((resSD:any)=>{
			if(resSD['status']){
				// $.alert({
				//   title: 'Success!',
				//   content: resSD['message'],
				// });
				this.display=true;
				this.success=true;
				this.result = resSD['message'];
			}else{
			  // $.alert({
			  //   title: 'Error!',
			  //   content: resSD['message'],
			  // });
			  this.display=true;
			  this.success=false;
			  this.result = resSD['message'];
			}
		  },(error)=>{
			console.log('resSD error',error);
			  // $.alert({
			  //   title: 'Error!',
			  //   content: 'Something Went Wrong. Please try again Later.',
			  // });
			  this.display=true;
			  this.success=false;
			  this.result = 'Something went wrong. Please try again later.';
		  });
	}

	userSubmit(){
		if(this.submited){
			this.userSubmitConfirm();
		}else{	
			this.confirmationService.confirm({
				message: 'Are you sure that you want to proceed?',
				header: 'Confirmation',
				icon: 'fa fa-question-circle',
				accept: () => {
					  //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
					this.userSubmitConfirm();
				},
				reject: () => {
				   // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
					this.userSubmitReject();
				}
			});
		}
	}

	userSubmitConfirm(){
	
	}
	userSubmitReject(){

	}

	filterAutocompleteData(query, filterAllData: any[],keyName):any[] {
		let filtered : any[] = [];
		for(let i = 0; i < filterAllData.length; i++) {
			let currData = filterAllData[i];
				if(query=='' || query==null){
					filtered.push(currData);
					if(i==50){
						break;
					}
				}else if(currData[keyName].toString().toLowerCase().includes(query.toLowerCase())) {
					  filtered.push(currData);
				}
		} 
		return filtered;
	}


	/* Region : Start */
	
	filterRegionMultiple(event) {
		//console.log('filterRegionMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=this.municipality?this.municipality:[];
		dataObj['subdistrict']=this.subdistrict?this.subdistrict:[];
		dataObj['postalcode']=this.postalCode?this.postalCode:[];
		let fKeyName="region";
		let fVaue=query;
		//console.log('dataObj',dataObj)
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
			this.allRegions = dataRes['result']; 
			this.filteredRegionMultiple=dataRes['result'];
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
	
	filterProvinceMultiple(event) {
		//console.log('filterProvinceMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=this.municipality?this.municipality:[];
		dataObj['subdistrict']=this.subdistrict?this.subdistrict:[];
		dataObj['postalcode']=this.postalCode?this.postalCode:[];
		let fKeyName="province";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allProvince = dataRes['result']; 
		this.filteredProvinceMultiple = dataRes['result']; 
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
	
	filterDistrictMultiple(event) {
		//console.log('filterDistrictMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=this.municipality?this.municipality:[];
		dataObj['subdistrict']=this.subdistrict?this.subdistrict:[];
		dataObj['postalcode']=this.postalCode?this.postalCode:[];
		let fKeyName="district";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allDistrict = dataRes['result'];
		this.filteredDistrictMultiple=dataRes['result'];
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
	
	filterMunicipalityMultiple(event) {
		//console.log('filterMunicipalityMultiple');
		let query = event.query;
		let dataObj={};
		dataObj['region']=this.region?this.region:[];
		dataObj['province']=this.province?this.province:[];
		dataObj['district']=this.district?this.district:[];
		dataObj['municipality']=this.municipality?this.municipality:[];
		dataObj['subdistrict']=this.subdistrict?this.subdistrict:[];
		dataObj['postalcode']=this.postalCode?this.postalCode:[];
		let fKeyName="municipality";
		let fVaue=query;
		this.userMapApi.getAreaMapping(dataObj,fKeyName,fVaue).subscribe((dataRes)=>{
		this.allMunicipality = dataRes['result'];
		this.filteredMunicipalityMultiple = dataRes['result'];
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

	filterSubDistrictMultiple(event) {
		//console.log('filterSubDistrictMultiple');
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
		this.filteredSubDistrictMultiple = dataRes['result']; 
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
	
	filterPostalCodeMultiple(event) {
		//console.log('filterPostalCodeMultiple');
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
		this.filteredPostalCodeMultiple  = dataRes['result']; 
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
	filterResetChildTax(fromName){
		//console.log('fromName',fromName);
		if(fromName=="region"){
			this.province=[];
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="province"){
			this.district=[];
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="district"){
			this.municipality=[];
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="municipality"){
			this.subdistrict=[];
			this.postalCode=[];
		}else if(fromName=="subdistrict"){
			this.postalCode=[];
		}else if(fromName=="postalcode"){
			
		}
	}
	
	roleNameParse(roleName){
		let newroleName = roleName.replace("$","");
		newroleName = newroleName.toString().toUpperCase();
		return newroleName;
	}

	// editUser(){
	// 	//console.log('this.role',this.role);
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": this.id,
	// 			"role": this.role
	// 		}
	// 	};  
	// 	this.router.navigate(["users/edit-user"], navigationExtras);
	// }

	// editVUser(id,role){
	
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 			"role": role,
	// 		}
	// 	};  
	// 	this.router.navigate(["users/view-user"], navigationExtras);
	// 	setTimeout(()=>{
	// 		window.location.reload();
	// 	},10);
	// }

}