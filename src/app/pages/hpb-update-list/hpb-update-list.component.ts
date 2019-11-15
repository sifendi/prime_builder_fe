import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, Hpb_update_approvalApi } from '../../../shared/loopback_sdk';
import {PaginatorModule} from 'primeng/primeng';
import * as moment from 'moment';
declare var window:any;

@Component({
  templateUrl: 'hpb-update-list.component.html'
})
export class HpbUpdateListComponent {
	loading: boolean=false;
	maxDateValue:any;
	updateddate: any;
	createddate: any;
	newMobile: any;
	oldMobile: any;
	name: any;
	filteredNewNo: any;
	allNewNo: any;
	allOldNo: any;
	filteredOldNo: any;
	allUsersFullName: any;
	filteredUserFullName: any;
	status:any="";
	total:Number=0;
	paginationVal:any=true;
	offset:any=0;
	ifEmpty:boolean=false;
	//type:any ="HPB";
	busy:any;
	updateUserData:any;
	perPageLimit:any=10;
	loggedinrole:any;
	user_id:any;
	
	constructor(private hpbUA:Hpb_update_approvalApi, private loopAuth:LoopBackAuth, private router: Router){
		var userDetails = this.loopAuth.getCurrentUserData();
		if(userDetails && (userDetails.userDet.roles)){
			this.loggedinrole = userDetails.userDet.roles[0]['name'];
			this.user_id = userDetails.id;
		}
	}

	ngOnInit(): void {
		if(this.loggedinrole == "$ra"){
			this.maxDateValue=new Date();
			this.resetData();
		}else{
			this.loading = true;
		}
	}

	paginate(event) {
		this.ifEmpty = false;
		this.offset=event.page;
		this.updateUserData = [];
		let createdDate = null;
		if(this.createddate){
			createdDate = moment(this.createddate).startOf('day').unix()*1000;
		}else{
			createdDate = "";
		}
		let updatedDate = null;
		if(this.updateddate){
			updatedDate = moment(this.updateddate).startOf('day').unix()*1000;
		}else{
			updatedDate = "";
		}
		let userId = "";
		if(this.name){
			userId = this.name.hpb_id;
		}
		let oldMobile = "";
		if(this.oldMobile){
			oldMobile = this.oldMobile.field_old_value;
		}
		let newMobile = "";
		if(this.newMobile){
			newMobile = this.newMobile.field_new_value;
		}

		if(this.status == undefined){
			this.status == "";
		}
		let para = {
			"page":this.offset,
			"hpb_id":userId,
			"field_new_value":newMobile,
			"field_old_value":oldMobile,
			"created_date":createdDate,
			"updated_date":updatedDate,
			"approval_status":this.status,
			"limit":10
		}
		this.getData(para);
	}

	searchData(){
		this.getCount();
	}

	filterFullName(event){ 
		let query = event.query;
		var param = {
			"is_closed":'0',
			"hpb_name":query
		}
		this.busy = this.hpbUA.getUpdateHpb(param).subscribe((dataRes)=>{
			this.allUsersFullName = dataRes['result'];
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName,'hpb_name');
		});
	}

	filterOldNo(event){ 
		let query = event.query;
		var param = {
			"is_closed":'0',
			"field_old_value":query
		}
		this.busy=this.hpbUA.getUpdateHpb(param).subscribe((dataRes)=>{
			this.allOldNo = dataRes['result'];
			this.filteredOldNo = this.filterAutocompleteData(query, this.allOldNo,'field_old_value');
		});
	}

	filterNewNo(event){ 
		let query = event.query;
		var param = {
			"is_closed":'0',
			"field_new_value":query
		}
		this.busy=this.hpbUA.getUpdateHpb(param).subscribe((dataRes)=>{
			this.allNewNo = dataRes['result'];
			this.filteredNewNo = this.filterAutocompleteData(query, this.allNewNo,'field_new_value');
		});
	}

	filterAutocompleteData(query, filterAllData: any[],keyName):any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered : any[] = [];
		for(let i = 0; i < filterAllData.length; i++) {
			let currData = filterAllData[i];
			if(query=='' || query==null){
				filtered.push(currData);
			}else if(currData[keyName].toString().toLowerCase().includes(query.toLowerCase())) {
				  filtered.push(currData);
			}
		}
		return filtered;
	}

	resetData(){
		this.ifEmpty = false;
		this.offset = 0;
		this.paginationVal=false;
		this.name="";
		this.oldMobile="";
		this.newMobile="";
		this.status= "";
		this.createddate="";
		this.updateddate="";
		this.getCount();
	}

	getCount(){
		let createdDate = null;
		if(this.createddate){
			createdDate = moment(this.createddate).startOf('day').unix()*1000;
		}else{
			createdDate = "";
		}
		let updatedDate = null;
		if(this.updateddate){
			updatedDate = moment(this.updateddate).startOf('day').unix()*1000;
		}else{
			updatedDate = "";
		}
		let userId = "";
		if(this.name){
			userId = this.name.hpb_id;
		}
		let oldMobile = "";
		if(this.oldMobile){
			oldMobile = this.oldMobile.field_old_value;
		}
		let newMobile = "";
		if(this.newMobile){
			newMobile = this.newMobile.field_new_value;
		}

		if(this.status == undefined){
			this.status == "";
		}
		let para = {
			"page":this.offset,
			"hpb_id":userId,
			"field_new_value":newMobile,
			"field_old_value":oldMobile,
			"created_date":createdDate,
			"updated_date":updatedDate,
			"approval_status":this.status,
			"is_closed":'0',
			"limit":10
		}

		console.log("this.user_id", this.user_id);

		this.busy=this.hpbUA.getUpdateHpbCount(para, this.user_id).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				console.log("data", data);
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(para);
			},
			err=>{},
			()=>{}
		)
	}

	getData(para){
		this.busy=this.hpbUA.getUpdateHpb(para,this.user_id).subscribe(
			data=>{
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.ifEmpty = true;
				}
				if(dataLength > 0){
					for(var i = 0; i<dataLength; i++){
						if(data.result[i].approval_status == 0){
							data.result[i].status = "Pending";
							data.result[i].classname = "btn-warning";
						}else if(data.result[i].approval_status == 1){
							data.result[i].status = "Approved";
							data.result[i].classname = "btn-success";
						}else if(data.result[i].approval_status == -1){
							data.result[i].status = "Rejected";
							data.result[i].classname = "btn-danger";
						}else{
							data.result[i].status = "";
							data.result[i].classname = "";
						}
						data.result[i].updated_date = moment(data.result[i].updated_date).format("DD MMM YYYY");
						data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					}
				}
				this.updateUserData = data.result;
				console.log("updateUserData", this.updateUserData);
			},
			err=>{
			},
			()=>{

			}
		)
	}
}