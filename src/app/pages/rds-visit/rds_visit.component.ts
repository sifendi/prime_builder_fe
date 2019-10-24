import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth,App_rds_visitApi, Retrieve_created_byApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';

@Component({
  templateUrl: 'rds_visit.component.html'
})

export class RdsVisitComponent {
	busy:any;
	rdsVisitData:any;
	ifEmpty:boolean = false;

	userDetails:any;
	rolename:any;
	offset:Number=0;
	total:Number=0;
	paginationVal:any=true;
	pagePerLimit:Number = 0;

	visitDateFrom:any="";
	visitDateTo:any="";
	value:Date;
	rdsName:any;
	rdsType:any="";
	createdBy:any;
	userList:any;
	user_id:any;
	
	allUsersFullName:any=[];
	filteredUserFullName:any=[];
	perPageLimit:any=10;
	offsetAuto:any=0;
	maxDate:Date;

	visitDateFromSearch:any="";
	visitDateToSearch:any="";
	rdsNameSearch:any="";
	rdsTypeSearch:any="";
	createdBySearch:any="";

	createdByErrors: boolean=false;

	constructor(private rdsVisit:App_rds_visitApi,private router: Router,private loopAuth:LoopBackAuth, private createdApi:Retrieve_created_byApi) {}
	
	// viewRds(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 		  "id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-rds-visit"], navigationExtras);
	// }
	
	ngAfterViewInit(): void {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		if(this.rolename == "$ra"){
			this.user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		
		
		this.getCount(0,10,"","","","","");
		
		this.maxDate = new Date();
	}
	
	getCount(offset,limit,visitDateFrom,visitDateTo,rdsName,rdsType,createdBy){
		if(createdBy){
			createdBy = createdBy.user_id;
		}
		this.busy = this.rdsVisit.getRdsVisitCount("","","",createdBy,"","","",0,this.user_id,this.rolename,rdsName,rdsType,visitDateFrom,visitDateTo).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal=true;
				}
				this.getData(offset,limit,visitDateFrom,visitDateTo,rdsName,rdsType,createdBy);
			},
			err=>{},
			()=>{}
		)
	}
	
	paginate(event) {
        this.rdsVisitData = [];
		this.offset=event.page;
		let createdBy = "";
		if(this.createdBySearch){
			createdBy = this.createdBySearch.user_id;
		}
		if(this.visitDateFromSearch || this.rdsNameSearch || this.rdsTypeSearch || createdBy){
			this.getData(this.offset,10,this.visitDateFromSearch,this.visitDateToSearch,this.rdsNameSearch,this.rdsTypeSearch,createdBy);
		}else{
			this.getData(this.offset,10,"","","","","");
		}
	}

	searchData(){
		if(this.value){			
			this.visitDateFrom = moment(this.value).startOf('day').unix()*1000;
			this.visitDateTo = moment(this.value).endOf('day').unix()*1000;
		}else{
			this.visitDateFrom = "";
			this.visitDateTo = "";
		}
		if(this.createdBy){
			if(this.createdBy.user_id != undefined && this.createdBy.user_id != ""){
				this.createdByErrors = false;
			}else{
				this.createdByErrors = true;
			}
		}else{
			this.createdByErrors = false;
		}
		if(!this.createdByErrors){
			this.rdsVisitData =[];
			this.rdsNameSearch = this.rdsName;
			this.rdsTypeSearch = this.rdsType;
			this.visitDateFromSearch = this.visitDateFrom;
			this.visitDateToSearch = this.visitDateTo;
			this.createdBySearch = this.createdBy;
			this.offset = 0;
			this.paginationVal = false;
			this.ifEmpty = false;
			this.getCount(0,10,this.visitDateFromSearch,this.visitDateToSearch,this.rdsNameSearch,this.rdsTypeSearch,this.createdBySearch);
		}
	}

	resetData(){
		this.paginationVal=false;
		this.offset=0;
		this.value = null;
		this.visitDateFrom = null;
		this.visitDateTo = null;
		this.rdsName = "";
		this.rdsType = "";
		this.createdBy = "";
		this.visitDateFromSearch = null;
		this.visitDateToSearch = null;
		this.rdsNameSearch = "";
		this.rdsTypeSearch = "";
		this.createdBySearch = "";
		this.createdByErrors = false;
		this.getCount(0,10,"","","","","");
	}
	
	getData(offset,limit,visitDateFrom,visitDateTo,rdsName,rdsType,createdBy){
		this.busy = this.rdsVisit.getRdsVisit("","","",createdBy,"","",limit,offset,this.user_id,this.rolename,rdsName,rdsType,visitDateFrom,visitDateTo).subscribe(
			data=>{
				var totalData = data.result.length;
				if(totalData == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<totalData; i++){
					data.result[i].visit_date = moment(data.result[i].visit_date).format("DD MMM YYYY");
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
				}
				this.rdsVisitData = data.result;
			},
			err=>{},	
			()=>{}
		)
	}
	filterFullName(event){ 
		let query = event.query;
		this.createdApi.getCreatedBy("rds_visit",this.perPageLimit,this.offsetAuto,query).subscribe((dataRes)=>{
			this.allUsersFullName = dataRes['result']; 
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName,'sph_name');
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
	goToPage(page,id){
		let navigationExtras:NavigationExtras = {
			queryParams:{
				"id":id
			}
		}
		this.router.navigate(["/"+page],navigationExtras);
	}
}