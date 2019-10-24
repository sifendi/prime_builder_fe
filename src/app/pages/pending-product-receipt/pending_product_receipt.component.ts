import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackConfig, LoopBackAuth,App_product_receiptApi, Retrieve_created_byApi,App_productsApi,App_hpbApi, App_projectsApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import {CalendarModule} from 'primeng/primeng';
import { ExcelService } from 'providers/services/services';
@Component({
  templateUrl: 'pending_product_receipt.component.html'
})

export class PendingProductReceiptComponent {
	prodrecData:any;
	value: Date;
	hpb:any;
	project:any;
	product:any;
	createdBy:any;
	userList:any;
	ifEmpty:boolean = false;
	
	busy:any;
	total:Number=0;
	paginationVal:any=true;
	offset:Number=0;
	
	allUsersFullName:any=[];
	filteredUserFullName:any=[];
	perPageLimit:any=10;
	offsetAuto:any=0;
	
	allProduct:any=[];
	filteredProduct:any=[];
	prodCall:any;
	
	allHpb:any=[];
	filteredHpb:any=[];
	hpbCall:any;
	
	allProject:any=[];
	filteredProject:any=[];
	projCall:any;
	maxDate:Date;
	exportData:any = [];

	createdByErrors: boolean=false;
	productErrors: boolean=false;
	projectErrors: boolean=false;
	hpbErrors: boolean=false;

	created_dateSearch: any="";
	approvalroleSearch: any="";
	approvalSearch: any="";
	productSearch: any="";
	projectSearch: any="";
	hpbSearch: any="";
	createdBySearch: any="";
	
	constructor(private prodApi:App_productsApi,private ProdRec:App_product_receiptApi,private service:ExcelService,private createdApi:Retrieve_created_byApi, private router: Router,private loopAuth:LoopBackAuth,private hpbApi:App_hpbApi, private projApi:App_projectsApi){
		this.maxDate = new Date();
	}
	
	paginate(event) {
		this.offset=event.page;
		let productId = null;
		if(this.productSearch){
			productId = this.productSearch.id;
		}
		let hpbId = null;
		if(this.hpbSearch){
			hpbId = this.hpbSearch.id;
		}
		let projectId = null;
		if(this.projectSearch){
			projectId = this.projectSearch.project_id;
		}
		this.getData(10,this.offset,this.createdBySearch,hpbId,projectId,productId,this.created_dateSearch);
	}
	
	// view(id,page){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 			"page":page
	// 		}
	// 	};
	// 	this.router.navigate(["view-product-receipt"], navigationExtras);
	// }
	
	ngAfterViewInit(): void {
		this.getCount(10,0,null,null,null,null,null);
	}
	
	searchData(){
		if(this.hpb){
			if(this.hpb.hpb_id != undefined && this.hpb.hpb_id != ""){
				this.hpbErrors = false;
			}else{
				this.hpbErrors = true;
			}
		}else{
			this.hpbErrors = false;
		}
		if(this.project){
			if(this.project.project_id != undefined && this.project.project_id != ""){
				this.projectErrors = false;
			}else{
				this.projectErrors = true;
			}
		}else{
			this.projectErrors = false;
		}

		if(this.product){
			if(this.product.id != undefined && this.product.id != ""){
				this.productErrors = false;
			}else{
				this.productErrors = true;
			}
		}else{
			this.productErrors = false;
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

		let created_date = null;
		if(this.value){
			created_date = moment(this.value).startOf('day').unix()*1000;
		}
		if(!this.projectErrors && !this.productErrors && !this.hpbErrors && !this.createdByErrors){
			this.prodrecData = [];
			this.createdBySearch = this.createdBy;
			this.hpbSearch = this.hpb;
			this.projectSearch = this.project;
			this.productSearch = this.product;
			this.created_dateSearch = created_date;
			this.offset = 0;
			this.paginationVal = false;
			this.ifEmpty = false;
			this.getCount(10,0,this.createdBySearch,this.hpbSearch,this.projectSearch,this.productSearch,this.created_dateSearch);
		}
	}
	
	resetData(){
		this.paginationVal = false;
		this.offset = 0;
		this.hpb = "";
		this.project = "";
		this.product = "";
		this.createdBy = "";
		this.value = null;
		this.ifEmpty = false;
		this.paginationVal=false;

		this.createdBySearch = "";
		this.hpbSearch = "";
		this.projectSearch = "";
		this.productSearch = "";
		this.approvalSearch = "";
		this.approvalroleSearch = "";
		this.created_dateSearch = "";

		this.createdByErrors=false;
		this.productErrors=false;
		this.projectErrors=false;
		this.hpbErrors=false;

		this.getCount(10,0,this.createdBy,this.hpb,this.project,this.product,null);
	}
	
	getCount(limit,offset,createdBy,hpb,project,product,created_date){
		if(product){
			product = product.id;
		}
		if(hpb){
			hpb = hpb.hpb_id;
		}
		if(project){
			project = project.project_id;
		}
		let userDetails = this.loopAuth.getCurrentUserData();
		
		let rolename = userDetails.userDet.roles[0].name;
		var user_id;
		if(rolename == "$ra"){
			user_id = userDetails.userDet.id;
		}else{
			rolename = "";
		}
		if(createdBy){
			createdBy = createdBy.user_id;
		}

		this.busy = this.ProdRec.getProductReceiptForAdminCount(null, hpb, project, product, null, user_id,rolename,null,null,createdBy,created_date,null,null,null,null,null,null,null,null,null,"0").subscribe(
			data=>{
				this.total = data.result[0].total;
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.prodrecData = [];
				this.getData(limit,offset,createdBy,hpb,project,product,created_date);
			},
			err=>{},	
			()=>{}
		)
	}
	
	getData(limit,offset,createdBy,hpb,project,product,created_date){
		
		this.prodrecData=[];
		let userDetails = this.loopAuth.getCurrentUserData();
		
		let rolename = userDetails.userDet.roles[0].name;
		var user_id;
		if(rolename == "$ra"){
			user_id = userDetails.userDet.id;
		}else{
			rolename = "";
		}
		
		this.busy = this.ProdRec.getProductReceiptForAdmin(null, hpb, project, product, null, user_id,rolename,null,null,createdBy,created_date,null,null,limit,offset,null,null,null,null,null,"0").subscribe(
			data=>{
				var totalData = data.result.length;
				for(var i=0; i<totalData; i++){
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					if(data.result[i].app.tlhapproval == 0){
						data.result[i].tlhapproval = 'Pending';
						data.result[i].tlhclassname = "btn-warning";
					}else if(data.result[i].app.tlhapproval == 1){
						data.result[i].tlhapproval = 'Approved';
						data.result[i].tlhclassname = "btn-success";
					}else if(data.result[i].app.tlhapproval == -1){
						data.result[i].tlhapproval = 'Rejected';
						data.result[i].tlhclassname = "btn-danger";
					}
					
					if(data.result[i].app.saapproval == 0){
						data.result[i].saapproval = 'Pending';
						data.result[i].saclassname = "btn-warning";
					}else if(data.result[i].app.saapproval == 1){
						data.result[i].saapproval = 'Approved';
						data.result[i].saclassname = "btn-success";
					}else if(data.result[i].app.saapproval == -1){
						data.result[i].saapproval = 'Rejected';
						data.result[i].saclassname = "btn-danger";
					}
					
					if(data.result[i].app.acapproval == 0){
						data.result[i].acapproval = 'Pending';
						data.result[i].acclassname = "btn-warning";
					}else if(data.result[i].app.acapproval == 1){
						data.result[i].acapproval = 'Approved';
						data.result[i].acclassname = "btn-success";
					}else if(data.result[i].app.acapproval == -1){
						data.result[i].acapproval = 'Rejected';
						data.result[i].acclassname = "btn-danger";
					}else{
						data.result[i].acapproval = '-';
						data.result[i].acclassname = "";
					}
					
					if(data.result[i].hpb_status == 'maintain'){
						data.result[i].hpb_status = 'Maintain';
					}else if(data.result[i].hpb_status == 'switching'){
						data.result[i].hpb_status = 'Switching';
					}else if(data.result[i].hpb_status == 'prospect'){
						data.result[i].hpb_status = 'Prospect';
					}else{
						data.result[i].hpb_status = '-';
					}

					if(data.result[i].hpb_type == 'mason'){
						data.result[i].hpb_type = 'Mason';
					}else if(data.result[i].hpb_type == 'contractor'){
						data.result[i].hpb_type = 'Contractor';
					}
				}
				this.prodrecData=data.result;
			},
			err=>{
				this.prodrecData=null;
			},
			()=>{

			}
		);
	}
	
	filterFullName(event){ 
		let query = event.query;
		this.createdApi.getCreatedBy("products_receipt_tbl",this.perPageLimit,this.offsetAuto,query).subscribe((dataRes)=>{
			this.allUsersFullName = dataRes['result']; 
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName,'sph_name');
		});
	}
	
	filterProduct(event){ 
		let query = event.query;
		if(this.prodCall){
			this.prodCall.unsubscribe();
		}
		this.prodCall = this.busy = this.prodApi.getProductslist(query,null,null,this.perPageLimit,this.offsetAuto).subscribe((dataRes)=>{
			this.allProduct = dataRes['result']; 
			this.filteredProduct = this.filterAutocompleteData(query, this.allProduct,'name');
		});
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


	// Download CSV Sample Code
	download(){
		this.exportData= [];

		let product = "";
		if(this.productSearch){
			product = this.productSearch.id;
		}

		let hpb = "";
		if(this.hpbSearch){
			hpb = this.hpbSearch.hpb_id;
		}

		let project = "";
		if(this.projectSearch){
			project = this.projectSearch.project_id;
		}
		let userDetails = this.loopAuth.getCurrentUserData();
		
		let rolename = userDetails.userDet.roles[0].name;
		var user_id;
		if(rolename == "$ra"){
			user_id = userDetails.userDet.id;
		}else{
			rolename = "";
		}

		let createdBy = "";
		if(this.createdBySearch){
			createdBy = this.createdBySearch.user_id;
		}

		// let created_date = null;
		// if(this.value){
		// 	created_date = moment(this.value).startOf('day').unix()*1000;
		// }

		this.busy = this.ProdRec.getProductReceiptForAdmin(null, hpb, project, product, null, user_id,rolename,null,null,createdBy,this.created_dateSearch,null,null,"","",null,null,null,null,null,'0').subscribe(
			data=>{
				var dataLength = data.result.length;
				for(var i=0; i<dataLength; i++){
					
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					if(data.result[i].app.tlhapproval == 0){
						data.result[i].tlhapproval = 'Pending';
					}else if(data.result[i].app.tlhapproval == 1){
						data.result[i].tlhapproval = 'Approved';
					}else if(data.result[i].app.tlhapproval == -1){
						data.result[i].tlhapproval = 'Rejected';
					}
					
					if(data.result[i].app.saapproval == 0){
						data.result[i].saapproval = 'Pending';
					}else if(data.result[i].app.saapproval == 1){
						data.result[i].saapproval = 'Approved';
					}else if(data.result[i].app.saapproval == -1){
						data.result[i].saapproval = 'Rejected';
					}
					
					if(data.result[i].app.acapproval == 0){
						data.result[i].acapproval = 'Pending';
					}else if(data.result[i].app.acapproval == 1){
						data.result[i].acapproval = 'Approved';
					}else if(data.result[i].app.acapproval == -1){
						data.result[i].acapproval = 'Rejected';
					}else{
						data.result[i].acapproval = '-';
					}

					if(data.result[i].hpb_type == 'mason'){
						data.result[i].hpb_type = 'Mason';
					}else if(data.result[i].hpb_type == 'contractor'){
						data.result[i].hpb_type = 'Contractor';
					}
					var arr = {'Product':data.result[i].product, 'Quantity':data.result[i].quantity, 'Unit':data.result[i].unit, 'Project':data.result[i].project, 'Is SRKu?':(data.result[i].is_srku?'Yes':'No'), 'HPB':data.result[i].hpb_name,'HPB Type':data.result[i].hpb_type,'HPB Status':data.result[i].hpb_status,'TLH Approval':data.result[i].tlhapproval,'AC Approval':data.result[i].acapproval,'SA Approval':data.result[i].saapproval,'Created By':data.result[i].sph_name,'Created Date':data.result[i].created_date};
					(this.exportData).push(arr);
				}

				//Function Call
				this.service.makeExcel(this.exportData,"prodReceiptData.xlsx");
			},
			err=>{},
			()=>{}
		);
	}

}