import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ReportSummaryApi, App_usersApi, RegionApi, LoopBackAuth } from '../../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import { ExcelService } from 'providers/services/services';

declare var window:any;
declare var hostname:any;
@Component({
    templateUrl: 'summary-detail.component.html'
})
export class SummaryDetailComponent{
    busy:any;
	display:boolean = false;
    submitted:boolean=false;
    loading:boolean=false;
    resultList:any;

	exportData:any = [];

    columns:any = [];
    key:any = [];
	
	apiUserList:any=[];
	userAC:any=[];

	type:any = "AC";
	uiTxtAC:any;
	uiTxtFromDate:any;
	uiTxtToDate:any;

    perPageLimit:any=10;
    offset:number = 0;
	total:number=0;
	paginationVal:boolean=true;
    
    downloadlink:any;
	downloading:boolean;
    downloaded:boolean;
    
    reporttype:any;
    reportName:any;
    
	monthErr:boolean = false;
	monthsArr:any = [];
    
    userDetails:any;
	rolename:any;
    user_id:any;

    thisYear:any = (new Date()).getFullYear();
    
    constructor(private userApi:App_usersApi, private reportSummaryApi:ReportSummaryApi, 
        private router: ActivatedRoute, private exportExcelUtil:ExcelService, private loopAuth:LoopBackAuth) {

        this.userDetails = this.loopAuth.getCurrentUserData();
        this.rolename = this.userDetails.userDet.roles[0].name;
        this.user_id = this.userDetails.id;

        var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		var date = new Date();
        var currentMonth = (date.getMonth())+1;
        
        for(var i=0; i<currentMonth; i++){			
			this.monthsArr.push(months[i]);
		}

		this.uiTxtFromDate = 1;
		this.uiTxtToDate = 1;
		
		if(currentMonth>1){
			this.uiTxtToDate = currentMonth;
		}
    }

    getACList(event){ 
		let query = event.query;
		this.userApi.getUsersDashboard(null,this.type,query,this.perPageLimit,this.offset,null,null,this.user_id,this.rolename).subscribe((dataRes)=>{
			this.apiUserList = dataRes['result']; 
			this.userAC = this.getACByName(query, this.apiUserList, 'realm');
		});
	}

	getACByName(query, filterAllData: any[], keyName):any[] {
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

	ngAfterViewInit(): void{
		/** TODO:
		 * Fixing Query for ReportSummaryApi getReportSummaryRegion
		 */
		console.log('TODO:Fixing Query for ReportSummaryApi getReportSummaryRegion');
		this.resetData();
	}
    
	resetData(){
		this.uiTxtAC = "";
		this.uiTxtFromDate = "";
		this.uiTxtToDate = "";
		this.searchData();
    }
    
    searchData(){
		let acId = null;

		if(this.uiTxtAC){
			acId = this.uiTxtAC.id;
		}

        var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
        for(var i=0; i<currentMonth; i++){			
            this.monthsArr.push(months[i]);
        }

        if(!this.uiTxtFromDate){
			this.uiTxtFromDate = 1;
        }
        
        if(!this.uiTxtToDate){
			var date = new Date();
			var currentMonth = (date.getMonth())+1;
			this.uiTxtToDate = currentMonth;
        }
        
        let fMonth = parseInt(this.uiTxtFromDate);
        let tMonth = parseInt(this.uiTxtToDate);
        if(fMonth > tMonth){
			this.monthErr = true;
		}else{
			this.monthErr = false;
			this.columns = [];
			this.key = [];
			var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
			for(var i=(this.uiTxtFromDate-1); i<this.uiTxtToDate; i++){			
				this.columns.push(months[i]+' Target');
				this.columns.push(months[i]+' Achieved');
				this.columns.push(months[i]+' Estimated');
				
				this.key.push(i+'target');
				this.key.push(i+'achieved');
				this.key.push(i+'estimated');
			}
        }
        
        if(this.monthErr == false){
            this.busy = this.reportSummaryApi.getReportDetail(acId, this.uiTxtFromDate, this.uiTxtToDate).subscribe(
				data=>{
					this.total = data.result.length;
					this.resultList = data.result;
				},
				err=>{this.loading = false;},
				()=>{this.loading = false;}
			)
        }
	}
	
	downloadData(){
		let acId = null;

		if(this.uiTxtAC){
			acId = this.uiTxtAC.id;
		}

        var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
        for(var i=0; i<currentMonth; i++){			
            this.monthsArr.push(months[i]);
        }

        if(!this.uiTxtFromDate){
			this.uiTxtFromDate = 1;
        }
        
        if(!this.uiTxtToDate){
			var date = new Date();
			var currentMonth = (date.getMonth())+1;
			this.uiTxtToDate = currentMonth;
        }
        
        let fMonth = parseInt(this.uiTxtFromDate);
        let tMonth = parseInt(this.uiTxtToDate);
        if(fMonth > tMonth){
			this.monthErr = true;
		}else{
			this.monthErr = false;
			this.columns = [];
			this.key = [];
			var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
			for(var i=(this.uiTxtFromDate-1); i<this.uiTxtToDate; i++){			
				this.columns.push(months[i]+' Target');
				this.columns.push(months[i]+' Achieved');
				this.columns.push(months[i]+' Estimated');
				
				this.key.push(i+'target');
				this.key.push(i+'achieved');
				this.key.push(i+'estimated');
			}
        }
        
        if(this.monthErr == false){
            this.busy = this.reportSummaryApi.getReportDetail(acId, this.uiTxtFromDate, this.uiTxtToDate).subscribe(
				data=>{
					var jans = 'Jan ' + (new Date()).getFullYear().toString();
					let febs = 'Feb ' + this.thisYear;
					let mars = 'Mar ' + this.thisYear;
					let aprs = 'Apr ' + this.thisYear;
					let mays = 'May ' + this.thisYear;
					let juns = 'Jun ' + this.thisYear;
					let juls = 'Jul ' + this.thisYear;
					let augs = 'Aug ' + this.thisYear;
					let seps = 'Sep ' + this.thisYear;
					let octs = 'Oct ' + this.thisYear;
					let novs = 'Nov ' + this.thisYear;
					let decs = 'Dec ' + this.thisYear;
					console.log(jans);
					console.log(febs);
					for(var kk=0;kk<data.result.length;kk++){
						var arr = {'HPB TYpe':data.result[kk].hpb_type,'Name':data.result[kk].hpb_name,
						'Mobile Phone 1':data.result[kk].primary_mobile_no,'Mobile Phone 2':data.result[kk].secondary_mobile_no,
						'Id Card Number':data.result[kk].id_card_number, 'Region':data.result[kk].region, 
						'District':data.result[kk].district,'SPH':data.result[kk].sph,'Jan':data.result[kk].jan,
						'Feb':data.result[kk].feb,'Mar':data.result[kk].mar,'Apr':data.result[kk].apr,'May':data.result[kk].may,
						'Jun':data.result[kk].jun,'Jul':data.result[kk].jul,'Aug':data.result[kk].aug,'Sep':data.result[kk].sep,
						'Oct':data.result[kk].oct,'Nov':data.result[kk].nov,decs:data.result[kk].dec};
						 (this.exportData).push(arr);
						 console.log(arr);
					}
					this.exportExcelUtil.makeExcel(this.exportData,"hpbReportDetail");
				},
				err=>{},
				()=>{}
			)
        }
	}
}