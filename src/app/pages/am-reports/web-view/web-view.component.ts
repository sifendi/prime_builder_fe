import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { User_mappingApi,App_usersApi,RegionApi,LoopBackAuth }   from '../../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

declare var window:any;
declare var hostname:any;

@Component({
  templateUrl: 'web-view.component.html'
})
export class WebViewComponent {
	busy:any;
	display:boolean = false;
	submitted:boolean=false;
	report:any;
	loading:boolean = true;
	columns:any = [];
	key:any = [];
	
	allRegion:any=[];
	filteredRegion:any=[];
	
	userList:any=[];
	type:any = "AC";
	region:any;
	fromDate:any;
	toDate:any;
	
	perPageLimit:any=10;
	total:any=0;
	paginationVal:any = true;
	offset:any=0;
	
	downloadlink:any;
	downloading:boolean;
	downloaded:boolean;
	
	reporttype:any;
	reportName:any;

	years:any = [];
	year:any;
	monthErr:boolean = false;
	monthsArr:any = [];
	currentYear:number;
	
	userDetails:any;
	rolename:any;
	user_id:any;
	
	constructor(private dApi:RegionApi, private uApi:App_usersApi, private mappingApi:User_mappingApi, private router: ActivatedRoute,private loopAuth:LoopBackAuth) {
		
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		this.user_id = this.userDetails.id;
		
		var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		var date = new Date();
		var currentMonth = (date.getMonth())+1;
		this.currentYear = date.getFullYear();
		this.year = this.currentYear;
		
		for(var i=0; i<currentMonth; i++){			
			this.monthsArr.push(months[i]);
		}
		
		// started from 2017
		for(var i=2017; i<=this.currentYear; i++){
			this.years.push(i);
		}
	}
    
	changeYear(event){
		
		var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		if(this.currentYear > event){
			var noOfMonth = 12;
		}else{
			var date = new Date();
			var noOfMonth = (date.getMonth())+1;
		}
		
		this.monthsArr = [];
		for(var i=0; i<noOfMonth; i++){			
			this.monthsArr.push(months[i]);
		}
	}
	
	filterRegion(event){ 
		let query = event.query;
		this.dApi.getRegion(this.perPageLimit,this.offset,query).subscribe((dataRes)=>{
			this.allRegion = dataRes['result']; 
			this.filteredRegion = this.filterAutocompleteDisData(query, this.allRegion,'name');
		});
	}

	filterAutocompleteDisData(query, filterAllData: any[],keyName):any[] {
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
	
	ngAfterViewInit(): void {
		this.router.queryParams.subscribe(params => {
			this.reporttype = params["type"];
			this.reportName = params["name"].replace(/-/g," ");
			this.resetData();
		});
	}
	
	resetData(){
		this.region = "";
		this.fromDate = "";
		this.toDate = "";
		this.year = this.currentYear;
		this.changeYear(this.currentYear);
		this.searchData();
	}
	
	searchData(){
		let regionName = null;
		if(this.region){
			regionName = this.region.id;
		}
		
		let curYear = this.currentYear;
		if(this.year){
			curYear = this.year;
			if(curYear != this.currentYear){
				this.monthsArr = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
			}
		}else{
			var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
			for(var i=0; i<currentMonth; i++){			
				this.monthsArr.push(months[i]);
			}
		}

		if(!this.fromDate){
			this.fromDate = 1;
		}
		
		if(!this.toDate){
			var date = new Date();
			var currentMonth = (date.getMonth())+1;
			this.toDate = currentMonth;
		}
		
		let fMonth = parseInt(this.fromDate);
		let tMonth = parseInt(this.toDate);
		if(fMonth > tMonth){
			this.monthErr = true;
		}
		else{
			this.monthErr = false;
			this.columns = [];
			this.key = [];
			var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
			for(var i=(this.fromDate-1); i<this.toDate; i++){			
				this.columns.push(months[i]+' Target');
				this.columns.push(months[i]+' Achieved');
				this.columns.push(months[i]+' Estimated');
				
				this.key.push(i+'target');
				this.key.push(i+'achieved');
				this.key.push(i+'estimated');
			}
		}
		if(this.monthErr == false){
			this.busy = this.mappingApi.getScorecardAMWebView(this.reporttype,this.rolename,this.user_id,regionName,this.fromDate,this.toDate,curYear).subscribe(
				data=>{
					this.report = data.result;
				},
				err=>{this.loading = false;},
				()=>{this.loading = false;}
			)		
		}
		
	}
	
	downloadData(){
		this.loading = true;
		
		let regionName = null;
		if(this.region){
			regionName = this.region.id;
		}
		
		let curYear = this.currentYear;
		if(this.year){
			curYear = this.year;
		}
		
		if(!this.fromDate){
			this.fromDate = 1;
		}
		
		if(!this.toDate){
			var date = new Date();
			var currentMonth = (date.getMonth())+1;
			this.toDate = currentMonth;
		}
		
		this.mappingApi.getScorecardAM(this.reporttype,null,this.rolename,this.user_id,regionName,this.fromDate,this.toDate,curYear).subscribe(
			data=>{
				var serverPath = data.result[0]['serverPath'];
				this.downloadlink = hostname+"/"+serverPath;
				this.downloading = false;
				this.downloaded = true;
				window.open(this.downloadlink,"_blank");
				this.loading = false;
			},
			err=>{
				this.loading = false;
			},
			()=>{
				this.loading = false;
			}
		)
	}
}