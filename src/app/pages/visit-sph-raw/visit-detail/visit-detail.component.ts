import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ReportVisitApi, App_usersApi, RegionApi, LoopBackAuth } from '../../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

declare var window:any;
declare var hostname:any;
@Component({
    templateUrl: 'visit-detail.component.html'
})
export class VisitDetailComponent{
    busy:any;
	display:boolean = false;
    submitted:boolean=false;
    loading:boolean=false;
    resultList:any;

    columns:any = [];
    key:any = [];
	
	apiUserList:any=[];
	userSph:any=[];

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
    
    constructor(private userApi:App_usersApi, private reportVisitApi:ReportVisitApi, 
        private router: ActivatedRoute, private loopAuth:LoopBackAuth) {

        this.userDetails = this.loopAuth.getCurrentUserData();
        this.rolename = this.userDetails.userDet.roles[0].name;
        this.user_id = this.userDetails.id;

        var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		var date = new Date();
        var currentMonth = (date.getMonth())+1;
        
        for(var i=0; i<currentMonth; i++){			
			this.monthsArr.push(months[i]);
		}
    }

    getSphList(event){ 
		let query = event.query;
		this.userApi.getUsersDashboard(null,this.type,query,this.perPageLimit,this.offset,null,null,this.user_id,this.rolename).subscribe((dataRes)=>{
			this.apiUserList = dataRes['result']; 
			this.userSph = this.getSphByName(query, this.apiUserList, 'realm');
		});
	}

	getSphByName(query, filterAllData: any[], keyName):any[] {
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
		 * Fixing Query for ReportVisiApi getVisit
		 */
		console.log('TODO:Fixing Query for ReportVisiApi getVisit');
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
            this.busy = this.reportVisitApi.getVisit(sphId, this.uiTxtFromDate, this.uiTxtToDate).subscribe(
				data=>{
					this.resultList = data.result;
				},
				err=>{this.loading = false;},
				()=>{this.loading = false;}
			)
        }
	}
	
	downloadData(){
		this.loading = true;
		let sphId = null;

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
			this.busy = this.reportVisitApi.getVisit(sphId, this.uiTxtFromDate, this.uiTxtToDate).subscribe(
				data=>{
					var serverPath = data.result[0]['serverPath'];
					this.downloadlink = hostname + "/" + serverPath;
					this.downloading = false;
					this.downloaded = true;
					window.open(this.downloadlink,"_blank");
					this.loading = false;
				},
				err=>{this.loading = false;},
				()=>{this.loading = false;}
			)
		}
	}
}