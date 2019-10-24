import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, App_usersApi } from '../../../../shared/loopback_sdk';
import {PaginatorModule} from 'primeng/primeng';
declare var window:any;
@Component({
  templateUrl: 'tlh.component.html'
})
export class TlhComponent {
	fullnameSearch: any="";
	statusSearch: any="";
	mobileNoSearch: any="";
	busy:any;
	userList:any=[];
	type:any = "TLH";
	name:any;
	mobile:any;
	perPageLimit:any=10;
	total:any=0;
	paginationVal:any = true;
	offset:any=0;
	allUsersFullName:any=[];
	filteredUserFullName:any=[];
	allUsersUserName:any=[];
	filteredUserName:any=[];
	loading:boolean = true;
	status:any = "";
	loggedinrole:any = null;
	user_id:any = null;
	fullNameErrors:boolean=false;
	userNameErrors:boolean=false;
	
	constructor(private uApi:App_usersApi, private loopAuth:LoopBackAuth, private router: Router){
		var userDetails = this.loopAuth.getCurrentUserData();
		if(userDetails && (userDetails.userDet.roles)){
			if(userDetails.userDet.roles[0]['name'] == "$ra"){
				this.loggedinrole = userDetails.userDet.roles[0]['name'];
				this.user_id = userDetails.id;
			}
		}
	}
  
	ngOnInit(): void {
		//this.getCount(this.perPageLimit,this.perPageLimit,this.type,null,null);
	}
	ngAfterViewInit(){
		this.getCount(this.offset,this.perPageLimit,this.type,null,null,null);
	}
	paginate(event) {
		this.userList = [];
		this.offset=event.page;
		this.getData(this.offset,this.perPageLimit,this.type,this.fullnameSearch,this.mobileNoSearch,this.statusSearch);
	}
	
	searchData(){
		if(this.name){
			if(this.name.realm != "" && this.name.realm != undefined){
				this.fullNameErrors = false;
				this.fullnameSearch = this.name.realm;
			}else{
				this.fullNameErrors = true;
				this.fullnameSearch = "";
			}
		}else{
			this.fullNameErrors = false;
			this.fullnameSearch = "";
		}
		if(this.mobile){
			if(this.mobile.username != "" && this.mobile.username != undefined){
				this.userNameErrors = false;
				this.mobileNoSearch = this.mobile.username;
			}else{
				this.userNameErrors = true;
				this.mobileNoSearch = "";
			}
		}else{
			this.userNameErrors = false;
			this.mobileNoSearch = "";
		}
		if(!this.userNameErrors && !this.fullNameErrors){
			this.offset = 0;
			this.paginationVal=false;
			this.statusSearch = this.status;
			this.getCount(this.offset,this.perPageLimit,this.type,this.fullnameSearch,this.mobileNoSearch,this.statusSearch);
		}
	}

	// viewUser(id,role){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 			"role": role,
	// 		}
	// 	};  
	// 	this.router.navigate(["users/view-user"], navigationExtras);
	// }

	editUser(id,role){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
				"role": role,
			}
		};  
		this.router.navigate(["users/edit-user"], navigationExtras);
	}
	
	addUser(){
		let navigationExtras: NavigationExtras = {
			queryParams: {
			}
		};  
		this.router.navigate(["users/add-user"], navigationExtras);
	}

	addBulkU(){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"role": '$sph',
			}
		};  
		this.router.navigate(["users/upload-users"], navigationExtras);
	}

	filterFullName(event){ 
		let query = event.query;
		let fmobile = window.safeValueWithKeyGet(this.mobile,'username');
		this.uApi.getUsersDashboard(null,this.type,query,this.perPageLimit,this.offset,fmobile,null,this.user_id,this.loggedinrole).subscribe((dataRes)=>{
			this.allUsersFullName = dataRes['result']; 
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName,'realm');
		});
	}

	filterUserName(event){
		let query = event.query;
		let fname = window.safeValueWithKeyGet(this.name,'realm');
		this.uApi.getUsersDashboard(null,this.type,fname,this.perPageLimit,this.offset,query,null,this.user_id,this.loggedinrole).subscribe((dataRes)=>{
			this.allUsersUserName = dataRes['result']; 
			this.filteredUserName = this.filterAutocompleteData(query, this.allUsersUserName,'username');
		});
	}

	filterAutocompleteData(query, filterAllData: any[],keyName):any[] {
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

	resetData(){
		this.offset= 0;
		this.name = null;
		this.mobile=null;
		this.status = "";
		this.paginationVal=false;
		this.fullnameSearch = null;
		this.mobileNoSearch = null;
		this.statusSearch ="";
		this.fullNameErrors=false;
		this.userNameErrors=false;
		this.getCount(this.offset,this.perPageLimit,this.type,this.name,this.mobile,this.status);
	}

	getCount(offset,limit,type,fname,fmobile,status){
		this.uApi.getUsersDashboardCount(null,type,fname,null,null,fmobile,this.user_id,this.loggedinrole,this.status).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(offset,limit,type,fname,fmobile,status);
			},
			err=>{
	
			},
			()=>{

			}
		)
	}
	
	getData(offset,limit,type,fname,fmobile,status){
		this.userList=[];
		this.busy=this.uApi.getUsersDashboard(null,type,fname,limit,offset,fmobile,null,this.user_id,this.loggedinrole,status).subscribe(
			data=>{
				this.loading = false;
				var totalData = data.result.length;
				this.userList = data.result;
			},
			err=>{

			},
			()=>{

			}
		)
	}

}