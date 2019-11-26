import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { User_mappingApi,App_usersApi,DistrictApi,LoopBackAuth }   from '../../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

declare var window:any;
declare var hostname:any;

@Component({
  templateUrl: 'am-scorecard.component.html'
})
export class AmScorecardComponent {
	busy:any;
	display:boolean = false;
	submitted:boolean=false;
	report:any;
	timeFactor:any;
	columns:any = [];
	key:any = [];
	
	allUsersFullName:any=[];
	filteredUserFullName:any=[];
	
	allDistrict:any=[];
	filteredDistrict:any=[];
	
	userList:any=[];
	type:any = "AM";
	name:any;
	district:any;
	month:any;
	
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
	currentYear:Number;
	currentMonth:Number;
	nameTyped:any = "";
	filterNameCall:any;
	filterDisCall:any;

	userDetails:any;
	rolename:any;
	user_id:any;
	
	constructor(private dApi:DistrictApi, private uApi:App_usersApi, private loopAuth:LoopBackAuth, private mappingApi:User_mappingApi, private router: ActivatedRoute) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		this.user_id = this.userDetails.id;
		
		var date = new Date();
		this.currentMonth = (date.getMonth())+1;
		this.currentYear = date.getFullYear();
		
		this.year = this.currentYear;
		this.month = this.currentMonth;
		 
		var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		for(var i=0; i<this.month; i++){			
			this.monthsArr.push(months[i]);
		}

		// started from 2017
		for(var i=2017; i<=this.currentYear; i++){
			this.years.push(i);
		}

		this.columns = ['Name','District','SRKU Target MTD','SRKU Achieved MTD','% SRKU MTD','SRKU Target YTD','SRKU Achieved YTD','% SRKU YTD','HPB Maintain Target MTD','HPB Maintain Achieved MTD','% HPB Maintain MTD','HPB Maintain Target YTD','HPB Maintain Achieved YTD','% HPB Maintain YTD','HPB Switching Target MTD','HPB Switching Achieved MTD','% HPB Switching MTD','HPB Switching Target YTD','HPB Switching Achieved YTD','% HPB Switching YTD','New Member Target MTD','New Member Achieved MTD','% New Member MTD','New Member Target YTD','New Member Achieved YTD','% New Member YTD','SRKU House Target MTD','SRKU House Achieved MTD','% SRKU House MTD','SRKU House Target YTD','SRKU House Achieved YTD','% SRKU House YTD'];
		
		
		this.key = ['name','district','srku_vol_target_month','srku_vol_achieved_month','srku_vol_month_percent','srku_vol_target_year','srku_vol_achieved_year','srku_vol_year_percent','cement_vol_maintain_target_month','cement_vol_maintain_achieved_month','cement_vol_maintain_month_percent','cement_vol_maintain_target_year','cement_vol_maintain_achieved_year','cement_vol_maintain_year_percent','cement_vol_switching_target_month','cement_vol_switching_achieved_month','cement_vol_switching_month_percent','cement_vol_switching_target_year','cement_vol_switching_achieved_year','cement_vol_switching_year_percent','new_switching_hpb_target_month','new_switching_hpb_achieved_month','new_switching_hpb_month_percent','new_switching_hpb_target_year','new_switching_hpb_achieved_year','new_switching_hpb_year_percent','srku_house_num_target_month','srku_house_num_achieved_month','srku_house_num_month_percent','srku_house_num_target_year','srku_house_num_achieved_year','srku_house_num_year_percent'];
		
		
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
		
		this.month = 1;
	}
	
	filterFullName(event){ 
		let query = event.query;
		if(this.filterNameCall){
			this.filterNameCall.unsubscribe();
		}
		this.filterNameCall = this.uApi.getUsersDashboard(null,this.type,query,this.perPageLimit,this.offset,null,null,this.user_id,this.rolename).subscribe((dataRes)=>{
			this.allUsersFullName = dataRes['result']; 
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName,'realm');
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
	
	filterDistrict(event){ 
		let query = event.query;
		if(this.filterDisCall){
			this.filterDisCall.unsubscribe();
		}
		this.filterDisCall = this.dApi.getDistrict(this.perPageLimit,this.offset,null,null,query).subscribe((dataRes)=>{
			this.allDistrict = dataRes['result']; 
			this.filteredDistrict = this.filterAutocompleteDisData(query, this.allDistrict,'name');
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
		this.searchData();
	}
	
	resetData(){
		this.name = "";
		this.district = "";
		this.month = this.currentMonth;
		this.year = this.currentYear;
		this.changeYear(this.currentYear);
		this.searchData();
	}
	
	searchData(){
		let acName = null;
		if(this.name){
			acName = this.name.id;
		}
		
		let districtName = null;
		if(this.district){
			districtName = this.district.id;
		}
		
		let curYear = this.currentYear;
		if(this.year){
			curYear = this.year;
			if(curYear != this.currentYear){
				this.monthsArr = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
			}
		}else{
			var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
			for(var i=0; i<this.currentMonth; i++){			
				this.monthsArr.push(months[i]);
			}
		}

		if(!this.month){
			this.month = this.currentMonth;
		}
		
		if(this.monthErr == false){
			this.busy = this.mappingApi.getAMScorecardSummaryWebView(this.rolename,this.user_id,acName,districtName,this.month,curYear).subscribe(
				data=>{
					this.report = data.result[0].report;
					this.timeFactor = data.result[0].timeFactor[0];
				},
				err=>{},
				()=>{}
			)		
		}
		
	}
	
	downloadData(){
		let acName = null;
		let districtName = null;
		if(this.name){
			acName = this.name.id;
		}
		if(this.district){
			districtName = this.district.id;
		}
		
		let curYear = this.currentYear;
		if(this.year){
			curYear = this.year;
		}
		
		if(!this.month){
			this.month = this.currentMonth;
		}
		
		this.busy = this.mappingApi.getAMScorecardSummary(null,null,this.rolename,this.user_id,acName,districtName,this.month,curYear).subscribe(
			data=>{
				var serverPath = data.result[0]['serverPath'];
				this.downloadlink = hostname+"/"+serverPath;
				this.downloading = false;
				this.downloaded = true;
				window.open(this.downloadlink,"_blank");
			},
			err=>{
			},
			()=>{
			}
		)
	}
}