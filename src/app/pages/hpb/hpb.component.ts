import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, App_hpbApi,App_usersApi, Retrieve_created_byApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation
import {PaginatorModule} from 'primeng/primeng';
import { Lightbox, IAlbum, LightboxConfig } from 'angular2-lightbox';
import { ExcelService } from 'providers/services/services';

declare var hostname:any;

@Component({
  templateUrl: 'hpb.component.html'
})
export class HpbComponent {
	createdByErrors: boolean=false;
	busy:any;
	hpbData:any;
	display:boolean = false;
	hpbName:any;
	hpbType:any="";
	hpbStatus:any="";
	primobNo:any;
	createdBy:any="";
	userList:any;
	ifEmpty:boolean = false;
	userDetails:any;
	rolename:any;
	loading:boolean = true;
	_albums:any = [];
	exportData:any = [];
	filteredUserFullName: any;
	allUsersFullName: any;

	//variables for filter & pagination
	paginationVal:any=true;
	perPageLimit:Number = 10;
	offset:Number=0;
	total:number;
	hpbNameSearch:any="";
	hpbTypeSearch:any="";
	hpbStatusSearch:any="";
	primobNoSearch:any="";
	createdBySearch:any="";

	constructor(private uApi:App_usersApi, private hpbApi:App_hpbApi,private service:ExcelService, private createdApi:Retrieve_created_byApi, private router: Router, private loopAuth:LoopBackAuth,private _lightbox: Lightbox) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}

	ngOnInit(): void {
		// get list of created by
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.getCount("",user_id,this.rolename,"","","",0,"");
	}

	getCount(createdBy,user_id,role,primobNo,hpbType,hpbName,offset,hpbStatus){
		this.loading = true;
		this.busy=this.hpbApi.getHpbCount("","","",createdBy,"","",user_id,role,primobNo,"","",hpbType,"","",hpbStatus,"","",hpbName).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(hpbName,primobNo,hpbType,createdBy,offset,10,hpbStatus);
			},
			err=>{

			},
			()=>{

			}
		)
	}
	// editProd(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["edit-hpb"], navigationExtras);
	// }

	// viewProd(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-hpb"], navigationExtras);
	// }

	showDialog() {
		this.display = true;
	}

	paginate(event) {
        this.hpbData = [];
		this.offset=event.page;
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}

		this.paginationVal=true;
		if(this.primobNoSearch || this.hpbTypeSearch || this.hpbNameSearch || this.createdBySearch || this.hpbStatusSearch){
			this.getData(this.hpbNameSearch,this.primobNoSearch,this.hpbTypeSearch,this.createdBySearch,this.offset,10,this.hpbStatusSearch);
		}else{
			this.getData("","","","",this.offset,10,"");
		}
	}

	searchData(){
		var user_id;
		if(this.createdBy){
			if(this.createdBy.user_id !="" && this.createdBy.user_id != undefined){
				this.createdByErrors = false;
				this.createdBySearch = this.createdBy.user_id;
			}else{
				this.createdByErrors = true;
				this.createdBySearch = "";
			}
		}else{
			this.createdByErrors = false;
		}
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		if(!this.createdByErrors){
			this.offset = 0;
			this.paginationVal=false;
			this.ifEmpty = false;
			this.hpbData =[];
			this.hpbNameSearch = this.hpbName;
			this.hpbTypeSearch = this.hpbType;
			this.hpbStatusSearch = this.hpbStatus;
			this.primobNoSearch = this.primobNo;
			this.getCount(this.createdBySearch,user_id,this.rolename,this.primobNoSearch,this.hpbTypeSearch,this.hpbNameSearch,0,this.hpbStatusSearch);
		}
	}

	resetPage(){
		this.offset = 0;
		this.paginationVal=false;
		this.primobNo = "";
		this.hpbType = "";
		this.hpbStatus = "";
		this.hpbName = "";
		this.createdBy = "";
		this.hpbNameSearch="";
		this.hpbTypeSearch="";
		this.hpbStatusSearch="";
		this.primobNoSearch="";
		this.createdBySearch="";
		this.createdByErrors = false;
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.getCount("",user_id,this.rolename,"","","",this.offset,"");
	}

	getData(hpbName,primobNo,hpbType,createdBy,offset,limit,hpbStatus){
		this._albums = [];
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.busy=this.hpbApi.getHpb("","","",createdBy,"","",user_id,this.rolename,primobNo,"","",hpbType,limit,offset,hpbStatus,"","",hpbName).subscribe(
			data=>{
				this.loading = false;
				var totalData = data.result.length;
				this.ifEmpty = false;
				if(totalData == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<totalData; i++){
					if((data.result[i].hpb_profile_pic) && (data.result[i].hpb_profile_pic.indexOf("[{") >= 0)){
						var hpb_profile_pic = JSON.parse(data.result[i].hpb_profile_pic)[0];
						data.result[i].hpb_profile_pic = hostname+"/api/container/"+hpb_profile_pic.container+"/download/"+hpb_profile_pic.name;
					}else{
						data.result[i].hpb_profile_pic = "../../../dashboard/assets/img/photo.jpg";
					}
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					this._albums.push(
						{
							src:data.result[i].hpb_profile_pic,
							thumb: data.result[i].hpb_profile_pic
						}
					);
				}
				this.hpbData = data.result;
			},
			err=>{},
			()=>{}
		)
	}

	filterFullName(event){ 
		let query = event.query;
		this.busy = this.createdApi.getCreatedBy("hpb_info_tbl",this.perPageLimit,"",query).subscribe((dataRes)=>{
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

	open(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums, index);
	}

	// Download CSV Sample Code
	download(){
		this.exportData= [];
		var user_id;
		if(this.rolename == "$ra"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}

		this.busy=this.hpbApi.getHpb("","","",this.createdBySearch,"","",user_id,this.rolename,this.primobNoSearch,"","",this.hpbTypeSearch,"","",this.hpbStatusSearch,"","",this.hpbNameSearch).subscribe(
			data=>{
				var dataLength = data.result.length;
				for(var i=0; i<dataLength; i++){
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					var arr = {'HPB Name':data.result[i].hpb_name, 'HPB Type':data.result[i].hpb_type, 'Primary Mobile':data.result[i].primary_mobile_no, 'HPB Status':data.result[i].hpb_status, 'Created By':data.result[i].sph_name,'Created At':data.result[i].created_date};
					(this.exportData).push(arr);
				}

				//Function Call
				this.service.makeExcel(this.exportData,"hpbData.xlsx");
			},
			err=>{},
			()=>{}
		);
	}
}