import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth,App_rds_visitApi, Retrieve_created_byApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import { ExcelService } from 'providers/services/services';

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
	namatoko:any;
	userList:any;
	user_id:any;
	exportData:any = [];
	rdsStart:Number=1;
	rdsTotal:Number=0;
	
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
	namatokoSearch:any="";

	createdByErrors: boolean=false;

	constructor(private rdsVisit:App_rds_visitApi,private router: Router,private loopAuth:LoopBackAuth,private service:ExcelService, private createdApi:Retrieve_created_byApi) {}
	
	
	ngAfterViewInit(): void {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		if(this.rolename == "$ra"){
			this.user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		
		this.maxDate = new Date();
		this.value=this.maxDate;
		var dd = ('0' + this.maxDate.getDate()).slice(-2);
		var mm = ('0' + (this.maxDate.getMonth()+1)).slice(-2);
		var yyyy = this.maxDate.getFullYear();
		this.visitDateFrom=yyyy+'-'+mm+'-'+dd;

		console.log(yyyy+'-'+mm+'-'+dd);

		this.getCount(0,10,this.visitDateFrom,"","","","");
	}
	
	getCount(offset,limit,visitDateFrom,visitDateTo,rdsName,rdsType,namatokoSearch){
		
		this.busy = this.rdsVisit.getRdsVisitCount("","","",namatokoSearch,"","","",0,this.user_id,this.rolename,rdsName,rdsType,visitDateFrom,visitDateTo).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal=true;
				}
				this.getData(offset,limit,visitDateFrom,visitDateTo,rdsName,rdsType,namatokoSearch);
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
		if(this.visitDateFromSearch || this.rdsNameSearch || this.rdsTypeSearch || this.namatokoSearch){
			this.getData(this.offset,10,this.visitDateFromSearch,this.visitDateToSearch,this.rdsNameSearch,this.rdsTypeSearch,this.namatokoSearch);
		}else{
			this.getData(this.offset,10,this.visitDateFrom,"","","","");
		}
	}

	searchData(){
		if(this.value){			
			this.visitDateFrom = this.value;
			this.visitDateTo = this.value;
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
			this.namatokoSearch = this.namatoko;
			this.visitDateFromSearch = moment(this.visitDateFrom).format("YYYY-MM-DD");
			this.visitDateToSearch = moment(this.visitDateTo).format("YYYY-MM-DD");
			this.createdBySearch = this.createdBy;
			this.offset = 0;
			this.paginationVal = false;
			this.ifEmpty = false;
			this.visitDateFrom = this.visitDateFromSearch;
			this.getCount(0,10,this.visitDateFromSearch,this.visitDateToSearch,this.rdsNameSearch,this.rdsTypeSearch,this.namatokoSearch);
		}
	}

	resetData(){
		this.paginationVal=false;
		this.offset=0;
		this.visitDateTo = null;
		this.rdsName = "";
		this.rdsType = "";
		this.createdBy = "";
		this.visitDateFromSearch = null;
		this.visitDateToSearch = null;
		this.rdsNameSearch = "";
		this.rdsTypeSearch = "";
		this.createdBySearch = "";
		this.namatokoSearch="";
		this.createdByErrors = false;
		this.getCount(0,10,this.visitDateFrom,"","","","");
	}
	
	getData(offset,limit,visitDateFrom,visitDateTo,rdsName,rdsType,createdBy){
		this.busy = this.rdsVisit.getRdsVisit("","",visitDateFrom,createdBy,"","",limit,offset,this.user_id,this.rolename,rdsName,rdsType,visitDateFrom,visitDateTo,"","").subscribe(
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

	download()
	{
		this.exportData = [];

		this.busy = this.rdsVisit.getRdsVisitDownload("","",this.visitDateFrom,this.namatokoSearch,"","","","",this.user_id,this.rolename,this.rdsName,this.rdsType,this.visitDateFrom,this.visitDateTo,this.rdsStart,this.rdsTotal).subscribe(
			data=>{
				var totalData = data.result.length;
				if(totalData == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<totalData; i++){
					data.result[i].TanggalKunjungan = moment(data.result[i].TanggalKunjungan).format("DD MMM YYYY hh:mm:ss");
					data.result[i].TanggalOut = moment(data.result[i].TanggalOut).format("DD MMM YYYY hh:mm:ss");
					// data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					var arr = {	'Regional':data.result[i].Regional, 
								'Nama AC':data.result[i].NamaAC, 
								"Distrik" : data.result[i].Distrik,
								"Nama SPH" : data.result[i].NamaSPH,
								"Tanggal Filter" : data.result[i].TanggalFilter,
								"Tanggal Kunjungan" : data.result[i].TanggalKunjungan,
								"GPS In" : data.result[i].GPSin,
								"Tanggal Out" : data.result[i].TanggalOut,
								"GPS Out" : data.result[i].GPSout,
								"Tipe Proyek" : data.result[i].TipeProyek,
								"Tipe Visit" : data.result[i].TipeVisit,
								"Nama Tempat" : data.result[i].NamaTempat,
								"Alamat" : data.result[i].Alamat,
								"Nama PB" : data.result[i].NamaPB,
								"No HP" : data.result[i].NoHP,
								"PB Status" : data.result[i].PBStatus,
								"Keterangan" : data.result[i].Keterangan,
							};
					(this.exportData).push(arr);
				}
				//Function Call
				this.service.makeExcel(this.exportData,"rds_visit_export");
			},
			err=>{},	
			()=>{}
		)
	}
}