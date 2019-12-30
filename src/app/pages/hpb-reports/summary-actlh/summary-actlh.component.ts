import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ReportSummaryApi, App_usersApi, LoopBackAuth } from '../../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import { ExcelService } from 'providers/services/services';

declare var window:any;
declare var hostname:any;
@Component({
    templateUrl: 'summary-actlh.component.html'
  })
export class SummaryAcTlhComponent{
    busy:any;
	display:boolean = false;
    submitted:boolean=false;
    loading:boolean=false;
	resultList:any;
	totalHpb:number = 0;
	exportData:any = [];

    columns:any = [];
    key:any = [];

    apiUserList:any=[];
    userSPH:any=[];

    type:any = "SPH";
	uiTxtSph:any;
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
    
    constructor(private userApi:App_usersApi, private reportSummaryApi:ReportSummaryApi, 
        private router: ActivatedRoute, private exportExcelUtil:ExcelService, private loopAuth:LoopBackAuth){
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

    getSPHList(event){ 
		let query = event.query;
		this.userApi.getUsersDashboard(null,this.type,query,this.perPageLimit,this.offset,null,null,this.user_id,this.rolename).subscribe((dataRes)=>{
			this.apiUserList = dataRes['result']; 
			this.userSPH = this.getACByName(query, this.apiUserList, 'realm');
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
	
	ngAfterViewInit(): void {
		/** TODO:
		 * Fixing Query for ReportSummaryApi getReportSummaryAcTlh
		 */
		console.log('TODO:Fixing Query for ReportSummaryApi getReportSummaryAcTlh');
		this.resetData();
	}

    resetData(){
		this.uiTxtSph = "";
		this.uiTxtFromDate = "";
		this.uiTxtToDate = "";
		this.searchData();
    }

    searchData(){
		let sphId = null;
		let fromDate = null;
		let toDate = null;
		
		if(this.uiTxtSph){
			sphId = this.uiTxtSph.id;
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
			if(this.uiTxtFromDate>9){
				fromDate = (new Date()).getFullYear() + this.uiTxtFromDate + '01';
			}else{
				fromDate = (new Date()).getFullYear() + '0' + this.uiTxtFromDate + '01';
			}
			if((this.uiTxtToDate + 1)>9){
				toDate = (new Date()).getFullYear() + (this.uiTxtToDate + 1) + '01';
			}else{
				toDate = (new Date()).getFullYear() + '0' + (this.uiTxtToDate + 1) + '01';
			}
            this.busy = this.reportSummaryApi.getReportSummaryAcTlh(sphId, fromDate, toDate).subscribe(
				data=>{
					this.resultList = data.result;
					this.totalHpb = this.getTotalHpb(this.resultList);
				},
				err=>{this.loading = false;},
				()=>{this.loading = false;}
			)
        }
	}

	getTotalHpb(resultData){
		var total = 0;
		for(var kk=0;kk<resultData.length;kk++){
			total += resultData[kk].numberHpb;
		}
		return total;
	}
	
	downloadData(){
		let sphId = null;
		let fromDate = null;
		let toDate = null;
		
		if(this.uiTxtSph){
			sphId = this.uiTxtSph.id;
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
			if(this.uiTxtFromDate>9){
				fromDate = (new Date()).getFullYear() + this.uiTxtFromDate + '01';
			}else{
				fromDate = (new Date()).getFullYear() + '0' + this.uiTxtFromDate + '01';
			}
			if((this.uiTxtToDate + 1)>9){
				toDate = (new Date()).getFullYear() + (this.uiTxtToDate + 1) + '01';
			}else{
				toDate = (new Date()).getFullYear() + '0' + (this.uiTxtToDate + 1) + '01';
			}
            this.busy = this.reportSummaryApi.getReportSummaryAcTlh(sphId, fromDate, toDate).subscribe(
				data=>{
					var total = this.getTotalHpb(data.result);
					for(var kk=0;kk<data.result.length;kk++){
						var dtArr = {'Purchase (x)':data.result[kk].quantity, 'Number of HPB':data.result[kk].numberHpb,
						'%':(((data.result[kk].numberHpb)/total)*100)+'%'};
						(this.exportData).push(dtArr);
						if(kk==(data.result.length-1)){
							(this.exportData).push({'Purchase (x)':'','Number of HPB':total,'%':'100%'});
						}
					}
					this.exportExcelUtil.makeExcel(this.exportData,"hpbReportSummaryACTLH");
				},
				err=>{},
				()=>{}
			)
        }
	}
}