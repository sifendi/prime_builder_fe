import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackConfig, LoopBackAuth,App_projectsApi,Project_typeApi,Project_stageApi,App_usersApi, Retrieve_created_byApi, App_hpbApi } from '../../../shared/loopback_sdk'
import * as moment from 'moment'; //for date manupalation
import {PaginatorModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import { Lightbox, IAlbum, LightboxConfig } from 'angular2-lightbox';
import { ExcelService } from 'providers/services/services';

declare var hostname:any;

@Component({
  templateUrl: 'project.component.html'
})
export class ProjectComponent {
	busy:any;
	value: Date;
	projects:any=[];
	projectName:any;
	projectType:any = "";
	projectage:any = "";
	createdBy:any;
	srku:any = "";
	approval:any = "";
	hpbName:any = "";
	typeData:any;
	stgData:any;
	userList:any;
	ifEmpty:boolean=false;
	userDetails:any;
	rolename:any;
	allUsersFullName:any=[];
	filteredUserFullName:any=[];
	allHpb:any=[];
	filteredHpb:any=[];
	_albums:any = [];
	nmcTotal:any;
	srkuTotal:any;
	allProject:any=[];
	filteredProject:any=[];
	projCall:any;
	exportData:any = [];
	maxDate:Date;

	//variables for filter & pagination
	projectNameSearch:any="";
	projectTypeSearch:any="";
	projectStageSerach:any="";
	isSrkuSerach:any="";
	srkuApprovedSearch:any="";
	hpbAssignedSearch:any="";
	createdBySearch:any="";
	createdFromSearch:any="";
	paginationVal:any=true;
	perPageLimit:any=10;
	offset:Number=0;
	total:Number=0;

	hpbAssignErrors: boolean=false;
	hpbNameErrors: boolean=false;
	projNameErrors: boolean=false;
	
	constructor(private uApi:App_usersApi,private projApi:App_projectsApi,private service:ExcelService,private router: Router,private projTypeApi:Project_typeApi,private proStApi:Project_stageApi,private loopAuth:LoopBackAuth, private createdApi:Retrieve_created_byApi,private _lightbox: Lightbox, private hpbApi:App_hpbApi) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		this.maxDate = new Date();
	}
	// view(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 		"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-project"], navigationExtras);
	// }
	ngAfterViewInit(): void {
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		
		this.getCount(user_id,this.rolename,null,null,null,null,0,10,null,null,null,null);
		
		this.projTypeApi.find().subscribe(
			data=>{
				this.typeData = data;
			},
			err=>{

			},
			()=>{

			}
		);
		
		this.proStApi.find().subscribe(
			data=>{
				this.stgData = data;
			},
			err=>{

			},
			()=>{

			}
		);
	}

	getCount(user_id,role,projectName,projectType,projectage,createdBy,offset,limit,srku,approval,created_date,hpbName){
		if(createdBy){
			createdBy = createdBy.user_id;
		}
		if(hpbName){
			hpbName = hpbName.hpb_id;
		}
		if(projectName){
			projectName = projectName.project_id;
		}
		this.busy = this.projApi.getProjectCount(hpbName,projectName,null,projectType,projectage,"",srku,createdBy,"",created_date,"",user_id,role,"","","",approval).subscribe(
			data=>{
				this.srkuTotal = data['result'][0]['srku'];
				this.nmcTotal = data['result'][0]['nmc'];
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(projectName,projectType,projectage,createdBy,offset,limit,srku,approval,created_date,hpbName);
			},
			err=>{

			},
			()=>{

			}
		)
	}

	paginate(event) {
        this.projects = [];
		this.offset=event.page;
		let hpbName = null;
		if(this.hpbAssignedSearch){
			hpbName = this.hpbAssignedSearch.hpb_id;
		}
		let projectId = null;
		if(this.projectNameSearch){
			projectId = this.projectNameSearch.project_id;
		}
		if(this.srkuApprovedSearch==undefined){
			this.srkuApprovedSearch = "";
		}
		if(this.srkuApprovedSearch != ""){
			this.isSrkuSerach = 1;
		}
		let createdBy = "";
		if(this.createdBySearch){
			createdBy = this.createdBySearch.user_id;
		}
		this.getData(projectId,this.projectTypeSearch,this.projectStageSerach,createdBy,this.offset,10,this.isSrkuSerach,this.srkuApprovedSearch,this.createdFromSearch,hpbName);
		this.paginationVal=true;
	}
	
	searchData(){
		if(this.projectName){
			if(this.projectName.project_id != "" && this.projectName.project_id != undefined){
				this.projNameErrors = false;
			}else{
				this.projNameErrors = true;
			}
		}else{
			this.projNameErrors = false;
		}
		if(this.createdBy){
			if(this.createdBy.user_id != "" && this.createdBy.user_id != undefined){
				this.hpbNameErrors = false;
			}else{
				this.hpbNameErrors = true;
			}
		}else{
			this.hpbNameErrors = false;
		}
		if(this.hpbName){
			if(this.hpbName.hpb_id != "" && this.hpbName.hpb_id != undefined){
				this.hpbAssignErrors = false;
			}else{
				this.hpbAssignErrors = true;
			}
		}else{
			this.hpbAssignErrors = false;
		}
		if(this.approval != ""){
			this.srku = 1;
		}
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		if(!this.projNameErrors && !this.hpbNameErrors && !this.hpbAssignErrors){
			let created_date:any = null;
			if(this.value){
				created_date = moment(this.value).startOf('day').unix()*1000;
				this.createdFromSearch = created_date;
			}else{
				this.createdFromSearch = "";
			}
			this.hpbAssignedSearch = this.hpbName;
			this.createdBySearch = this.createdBy;
			this.projectNameSearch = this.projectName;
			this.projectTypeSearch = this.projectType;
			this.projectStageSerach = this.projectage;
			this.srkuApprovedSearch = this.approval;
			this.isSrkuSerach = this.srku;
			this.projects = [];
			this.offset = 0;
			this.paginationVal = false;
			this.getCount(user_id,this.rolename,this.projectNameSearch,this.projectTypeSearch,this.projectStageSerach,this.createdBySearch,0,10,this.isSrkuSerach,this.srkuApprovedSearch,this.createdFromSearch,this.hpbAssignedSearch);
		}
	}

	resetData(){
		this.projects = [];
		this.offset = 0;
		this.paginationVal = false;
		this.projectType = "";
		this.projectage = "";
		this.projectName = "";
		this.value = null;
		this.createdBy = null;
		this.srku = "";
		this.approval = "";
		this.hpbName = "";
		var user_id;

		this.projectNameSearch="";
		this.projectTypeSearch="";
		this.projectStageSerach="";
		this.isSrkuSerach="";
		this.srkuApprovedSearch="";
		this.hpbAssignedSearch="";
		this.createdBySearch=null;
		this.createdFromSearch=null;

		this.projNameErrors = false;
		this.hpbNameErrors = false;
		this.hpbAssignErrors = false;

		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.getCount(user_id,this.rolename,"","","","",0,10,"","","",null);
	}

	getData(projectName,projectType,projectage,createdBy,offset,limit,srku,approval,created_date,hpbName){
		this._albums = [];
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.busy = this.projApi.getProject(hpbName,projectName,null,projectType,projectage,"",srku,createdBy,"",created_date,"",user_id,this.rolename,limit,offset,"",approval).subscribe(
			data=>{
				var totalData = data.result.length;
				this.ifEmpty = false;
				if(totalData == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<totalData; i++){
					if((data.result[i].project_photo) && (data.result[i].project_photo.indexOf("serverPath") >= 0)){
						var project_photo = JSON.parse(data.result[i].project_photo)[0];
						data.result[i].project_photo = hostname+"/api/container/"+project_photo.container+"/download/"+project_photo.name;
					}else{
						data.result[i].project_photo = "../../../dashboard/assets/img/photo.jpg";
					}
					
					data.result[i].project_photo_array = [];
					data.result[i].project_photo_array.push(
						{
							src:data.result[i].project_photo, 
							thumb: data.result[i].project_photo, title:data.result[i].project_name
						}
					);
					this._albums.push(
						{
							src:data.result[i].project_photo,
							thumb: data.result[i].project_photo
						}
					);

					if(data.result[i].is_srku == 1){ data.result[i].is_srku = "Yes"; }else{ data.result[i].is_srku = "No"; }
					data.result[i].approval = "";
					console.log("data.result[i]",data.result[i].app);
					if(data.result[i].app !=""){
						if(data.result[i].app[0]['srku_approval_status'] == 0){
							data.result[i].approval = "Pending";
							data.result[i].classname = "btn-warning";
						}else if(data.result[i].app[0]['srku_approval_status'] == 1){
							data.result[i].approval = "Approved";
							data.result[i].classname = "btn-success";
						}else if(data.result[i].app[0]['srku_approval_status'] == -1){
							data.result[i].approval = "Rejected";
							data.result[i].classname = "btn-danger";
						}
					}

					if(data.result[i].project_quantity_estimation != ''){ 
						data.result[i].project_quantity_estimation = data.result[i].project_quantity_estimation+" (Tons)";
					}
					data.result[i].project_completion_date = moment(data.result[i].project_completion_date).format("DD MMM YYYY");
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
				}

				this.projects = data.result;
			},
			err=>{},
			()=>{}
		)
	}
	
	filterFullName(event){ 
		let query = event.query;
		this.busy = this.createdApi.getCreatedBy("projects_tbl",this.perPageLimit,"",query).subscribe((dataRes)=>{
			this.allUsersFullName = dataRes['result']; 
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName,'sph_name');
		});
	}
	
	filterHpb(event){ 
		let query = event.query;
		this.busy = this.hpbApi.getHpb(null,null,null,null,null,null,null,null,null,null,null,null,this.perPageLimit,"",null,null,null,query).subscribe((dataRes)=>{
			this.allHpb = dataRes['result']; 
			this.filteredHpb = this.filterAutocompleteData(query, this.allHpb,'hpb_name');
		});
	}

	filterProject(event){ 
		let query = event.query;
		if(this.projCall){
			this.projCall.unsubscribe();
		}
		this.projCall = this.busy = this.projApi.getProject(null,null,query,null,null,null,null,null,null,null,null,null,null,this.perPageLimit,"").subscribe((dataRes)=>{
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
	
	// goToHpb(id){
	// 	let navigationExtras:NavigationExtras = {
	// 		queryParams:{
	// 			"id":id
	// 		}
	// 	}
	// 	this.router.navigate(["/view-hpb"],navigationExtras);
	// }
	
	open(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums, index);
	}

	// Download CSV Sample Code
	download(){
		this.exportData= [];

		let hpbName = null;
		if(this.hpbAssignedSearch){
			hpbName = this.hpbAssignedSearch.hpb_id;
		}
		let projectId = null;
		if(this.projectNameSearch){
			projectId = this.projectNameSearch.project_id;
		}
		if(this.srkuApprovedSearch==undefined){
			this.srkuApprovedSearch = "";
		}
		if(this.srkuApprovedSearch != ""){
			this.isSrkuSerach = 1;
		}
		let createdBy = "";
		if(this.createdBySearch){
			createdBy = this.createdBySearch.user_id;
		}
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}

		this.busy = this.projApi.getProject(hpbName,projectId,null,this.projectTypeSearch,this.projectStageSerach,"",this.isSrkuSerach,createdBy,"",this.createdFromSearch,"",user_id,this.rolename,"","","",this.srkuApprovedSearch).subscribe(
			data=>{
				var dataLength = data.result.length;
				for(var i=0; i<dataLength; i++){
					data.result[i].project_completion_date = moment(data.result[i].project_completion_date).format("DD MMM YYYY");
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					if(data.result[i].project_quantity_estimation != ''){ 
						data.result[i].project_quantity_estimation = data.result[i].project_quantity_estimation+" (Tons)";
					}else{
						data.result[i].project_quantity_estimation = "-";
					}
					if(data.result[i].is_srku == 1){ data.result[i].is_srku = "Yes"; }else{ data.result[i].is_srku = "No"; }
					data.result[i].approval = "";
					if(data.result[i].app !=""){
						if(data.result[i].app[0]['srku_approval_status'] == 0){
							data.result[i].approval = "Pending";
						}else if(data.result[i].app[0]['srku_approval_status'] == 1){
							data.result[i].approval = "Approved";
						}else if(data.result[i].app[0]['srku_approval_status'] == -1){
							data.result[i].approval = "Rejected";
						}
					}else{
						data.result[i].approval = "-";
					}
					console.log("status",data.result[i].approval);
					if(data.result[i].hpb_name == "" || data.result[i].hpb_name == null){
						data.result[i].hpb_name = "-";
					}
					console.log("assigned",data.result[i].hpb_name);

					var arr = {'Project Name':data.result[i].project_name, 'Completion Date':data.result[i].project_completion_date, 'Quantity Estimation':data.result[i].project_quantity_estimation, 'Project Stage':data.result[i].project_stage_name, 'Project Type':data.result[i].project_type_name,'Is SRKU':data.result[i].is_srku,'Approval':data.result[i].approval,'HPB Assigned':data.result[i].hpb_name,'Created By':data.result[i].sph_name,'Created Date':data.result[i].created_date};
					(this.exportData).push(arr);
				}

				//Function Call
				this.service.makeExcel(this.exportData,"projectData.xlsx");
			},
			err=>{},
			()=>{}
		);
	}
}