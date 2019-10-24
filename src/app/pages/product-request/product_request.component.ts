import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth,App_product_requestApi,Retrieve_created_byApi,App_hpbApi, App_projectsApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';

@Component({
  templateUrl: 'product_request.component.html'
})
export class ProductRequestComponent {
	prodRequest:any;
	ifEmpty:boolean = false;
	busy:any;
	userDetails:any;
	rolename:any;

	reqDateFrom:any;
	reqDateTo:any;
	value:Date;
	projectName:any;
	hpbName:any;
	reqStatus:any = "";
	user_id:any;
	createdBy:any;
	
	allHpb:any=[];
	filteredHpb:any=[];
	hpbCall:any;

	allUsersFullName:any=[];
	filteredUserFullName:any=[];
	
	allProject:any=[];
	filteredProject:any=[];
	projCall:any;
	
	//filter and pagination variable
	offset:Number=0;
	total:Number=0;
	limit:Number=10;
	paginationVal:any=true;
	perPageLimit:any=10;
	offsetAuto:any=0;
	reqStatusSearch: any="";
	projectNameSearch: any="";
	createdBySearch: any="";
	hpbNameSearch: any="";
	reqDateToSearch: any;
	reqDateFromSearch: any;

	projectNameErrors: boolean=false;
	createdByErrors: boolean=false;
	hpbNameErrors: boolean=false;
	
	maxDate:Date;
	constructor(private prReq:App_product_requestApi, private createdApi:Retrieve_created_byApi, private router: Router, private loopAuth:LoopBackAuth,private hpbApi:App_hpbApi, private projApi:App_projectsApi) {
		this.maxDate = new Date();
		let userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = userDetails.userDet.roles[0].name;
		if(this.rolename == "$ra"){
			this.user_id = userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
	}
  
	ngAfterViewInit(): void {
        this.getCount("","","","","",0,this.limit,"");
    }
	
	paginate(event) {
        this.prodRequest = [];
		this.offset=event.page;

		let createdby="";
		if(this.createdBySearch){
			createdby = this.createdBySearch.user_id;
		}
		let hpbId = null;
		if(this.hpbNameSearch){
			hpbId = this.hpbNameSearch.id;
		}
		let projectId = null;
		if(this.projectNameSearch){
			projectId = this.projectNameSearch.project_id;
		}
		this.getData(this.limit,this.offset,this.reqDateFromSearch,this.reqDateToSearch,this.reqStatusSearch,projectId,hpbId,createdby);
	}

	getCount(reqDateFrom,reqDateTo,hpbName,projectName,reqStatus,offset,limit,createdby){
		if(hpbName){
			hpbName = hpbName.hpb_id;
		}
		if(createdby){
			createdby = createdby.user_id;
		}
		if(projectName){
			projectName = projectName.project_id;
		}
		this.busy = this.prReq.getProductRequestCount("",createdby,"","","",this.user_id,this.rolename,"","",hpbName,projectName,reqDateFrom,reqDateTo,reqStatus).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				console.log(this.total);
				if(this.total <= this.limit){
					this.paginationVal = false;
				}else{
					this.paginationVal=true;
				}
				this.getData(limit,offset,reqDateFrom,reqDateTo,reqStatus,projectName,hpbName,createdby);
			},
			err=>{},	
			()=>{}
		)
	}
	
	searchData(){
		if(this.value){			
			this.reqDateFrom = moment(this.value).startOf('day').unix()*1000;
			this.reqDateTo = moment(this.value).endOf('day').unix()*1000;
		}else{
			this.reqDateFrom = "";
			this.reqDateTo = "";
		}
		if(this.hpbName){
			if(this.hpbName.hpb_id != undefined && this.hpbName.hpb_id != ""){
				this.hpbNameErrors = false;
			}else{
				this.hpbNameErrors = true;
			}
		}else{
			this.hpbNameErrors = false;
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
		if(this.projectName){
			if(this.projectName.project_id != undefined && this.projectName.project_id != ""){
				this.projectNameErrors = false;
			}else{
				this.projectNameErrors = true;
			}
		}else{
			this.projectNameErrors = false;
		}

		if(!this.hpbNameErrors && !this.createdByErrors && !this.projectNameErrors){
			this.prodRequest =[];
			this.hpbNameSearch = this.hpbName;
			this.createdBySearch = this.createdBy;
			this.projectNameSearch = this.projectName;
			this.reqStatusSearch = this.reqStatus;
			this.reqDateFromSearch = this.reqDateFrom;
			this.reqDateToSearch = this.reqDateTo;
			this.offset = 0;
			this.paginationVal = false;
			this.ifEmpty = false;
			this.getCount(this.reqDateFromSearch,this.reqDateToSearch,this.hpbNameSearch,this.projectNameSearch,this.reqStatusSearch,0,this.limit,this.createdBySearch);
		}
	}

	resetData(){
		this.paginationVal=false;
		this.reqDateFrom = "";
		this.reqDateTo = "";
		this.hpbName = "";
		this.offset = 0;
		this.projectName = "";
		this.reqStatus = "";
		this.createdBy = "";
		this.reqDateFromSearch = "";
		this.reqDateToSearch = "";
		this.hpbNameSearch = "";
		this.projectNameSearch = "";
		this.reqStatusSearch = "";
		this.createdBySearch = "";
		this.createdByErrors = false;
		this.hpbNameErrors = false;
		this.projectNameErrors = false;

		this.getCount(this.reqDateFrom,this.reqDateTo,this.hpbName,this.projectName,this.reqStatus,0,this.limit,this.createdBy);
		this.value = null;
	}
	
	getData(limit,offset,reqDateFrom,reqDateTo,reqStatus,projectName,hpbName,createdBy){
		this.busy = this.prReq.getProductRequest("",createdBy,"","","",this.user_id,this.rolename,limit,offset,hpbName,projectName,reqDateFrom,reqDateTo,reqStatus).subscribe(
			data=>{
				var length = data.result.length;
				if(length == 0){
					this.ifEmpty = true;
				}else{
					this.ifEmpty = false;
				}
				for(var i=0; i<length; i++){
					data.result[i].request_date = moment(data.result[i].request_date).format("DD MMM YY");
					if(data.result[i].product_request_status == 0){
						data.result[i].product_request_status = "Pending";
						data.result[i].productclassname = "btn-warning";
					}else if(data.result[i].product_request_status == 1){
						data.result[i].product_request_status = "Approved";
						data.result[i].productclassname = "btn-success";
					}else if(data.result[i].product_request_status == -1){
						data.result[i].product_request_status = "Rejected";
						data.result[i].productclassname = "btn-danger";
					}
				}
				this.prodRequest = data.result; 
			},
			err=>{
			
			},
			()=>{

			}
        )
	}
	
	// viewRequest(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-product-request"], navigationExtras);
	// }
	
	goToPage(page,id){
		let navigationExtras:NavigationExtras = {
			queryParams:{
				"id":id
			}
		}
		this.router.navigate(["/"+page],navigationExtras);
	}
	
	filterHpb(event){ 
		let query = event.query;
		if(this.hpbCall){
			this.hpbCall.unsubscribe();
		}
		this.hpbCall = this.busy = this.hpbApi.getHpb(null,null,null,null,null,null,null,null,null,null,null,null,this.perPageLimit,this.offsetAuto,null,null,null,query).subscribe((dataRes)=>{
			this.allHpb = dataRes['result']; 
			this.filteredHpb = this.filterAutocompleteData(query, this.allHpb,'hpb_name');
		});
	}
	
	filterProject(event){ 
		let query = event.query;
		if(this.projCall){
			this.projCall.unsubscribe();
		}
		this.projCall = this.busy = this.projApi.getProject(null,null,query,null,null,null,null,null,null,null,null,null,null,this.perPageLimit,this.offsetAuto).subscribe((dataRes)=>{
			this.allProject = dataRes['result']; 
			this.filteredProject = this.filterAutocompleteData(query, this.allProject,'project_name');
		});
	}

	filterFullName(event){ 
		let query = event.query;
		this.busy = this.createdApi.getCreatedBy("products_request_tbl",this.perPageLimit,this.offsetAuto,query).subscribe((dataRes)=>{
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
}
