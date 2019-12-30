import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ReportVisitApi, App_usersApi, RegionApi, LoopBackAuth } from '../../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

declare var window:any;
declare var hostname:any;
@Component({
    templateUrl: 'visit-summary-ho.component.html'
  })
export class VisitSummaryHoComponent{
    busy:any;
	display:boolean = false;
    submitted:boolean=false;
    loading:boolean=false;
    resultList:any;

    columns:any = [];
    key:any = [];
    
    apiRegionList:any=[];
    region:any=[];

	type:any = "SPH";
	uiDdlPeriode:any;
	uiTxtRegion:any;
	uiDdlVisitIdeal:any;

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

	visitIdealRate:any = [];
    
    userDetails:any;
	rolename:any;
    user_id:any;
    
    constructor(private userApi:App_usersApi, private regionApi: RegionApi, 
        private reportVisitApi:ReportVisitApi, private router: ActivatedRoute, 
        private loopAuth:LoopBackAuth) {

        this.userDetails = this.loopAuth.getCurrentUserData();
        this.rolename = this.userDetails.userDet.roles[0].name;
        this.user_id = this.userDetails.id;

        var months = ["Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		var date = new Date();
        var currentMonth = (date.getMonth())+1;
        
        for(var i=0; i<currentMonth; i++){			
			this.monthsArr.push(months[i]);
		}

		for(var k=1; k<=15; k++){
			this.visitIdealRate.push(k);
		}
    }

    getRegionList(event){ 
		let query = event.query;
		this.regionApi.getRegion(this.perPageLimit,this.offset,query).subscribe((dataRes)=>{
			this.apiRegionList = dataRes['result']; 
			this.region = this.getRegionByName(query, this.apiRegionList, 'name');
		});
	}
	
	getRegionByName(query, filterAllData: any[], keyName):any[] {
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
		 * Fixing Query for ReportVisiApi getVisitSummaryHo
		 */
		console.log('TODO:Fixing Query for ReportVisiApi getVisitSummaryHo');
		this.resetData();
	}
	
	resetData(){
		this.uiTxtRegion = "";
		this.uiDdlPeriode = "";
		this.uiDdlVisitIdeal = "";
		this.searchData();
    }
    
    searchData(){
		let region = null;

		if(this.uiTxtRegion){
			region = this.uiTxtRegion.id;
		}

        if(!this.uiDdlPeriode){
			var date = new Date();
			var currentMonth = (date.getMonth())+1;
			this.uiDdlPeriode = currentMonth;
        }
        
        if(!this.uiDdlVisitIdeal){
			this.uiDdlVisitIdeal = 1;
        }
        
        if(this.monthErr == false){
            this.busy = this.reportVisitApi.getVisitSummaryHo(region, this.uiDdlPeriode, this.uiDdlVisitIdeal).subscribe(
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

		let region = null;

		if(this.uiTxtRegion){
			region = this.uiTxtRegion.id;
		}

        if(!this.uiDdlPeriode){
			var date = new Date();
			var currentMonth = (date.getMonth())+1;
			this.uiDdlPeriode = currentMonth;
        }
        
        if(!this.uiDdlVisitIdeal){
			this.uiDdlVisitIdeal = 1;
        }
        
        if(this.monthErr == false){
            this.busy = this.reportVisitApi.getVisitSummaryHo(region, this.uiDdlPeriode, this.uiDdlVisitIdeal).subscribe(
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