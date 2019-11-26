import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, User_mappingApi } from '../../../shared/loopback_sdk';
import {PaginatorModule} from 'primeng/primeng';

declare var hostname:any;

@Component({
  templateUrl: 'reports.component.html'
})
export class ReportsComponent {
  
	downloadedSrku:boolean = false;
	downloadlinkSrku:any;
	downloadingSrku:boolean = false;

	downloadedSwitching:boolean = false;
	downloadlinkSwitching:any;
	downloadingSwitching:boolean = false;	
	
	
	downloadedMaintain:boolean = false;
	downloadlinkMaintain:any;
	downloadingMaintain:boolean = false;
	
	downloadedHpb:boolean = false;
	downloadlinkHpb:any;
	downloadingHpb:boolean = false;
	
	downloadedVol:boolean = false;
	downloadlinkVol:any;
	downloadingVol:boolean = false;
	
	downloadedSummary:boolean = false;
	downloadlinkSummary:any;
	downloadingSummary:boolean = false;
	
	userDetails:any;
	rolename:any;
	user_id:any;
	
	constructor(private uApi:User_mappingApi, private loopAuth:LoopBackAuth, private router: Router){
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		this.user_id = this.userDetails.userDet.id;
		
		if(this.rolename != '$ra'){
			this.rolename = "";
			this.user_id = "";
		}
	}
  
	ngOnInit(): void {}
	
	downloadSummary(){
		
		this.downloadingSummary = true;
		this.uApi.getScorecardSummary(null,null,this.rolename,this.user_id).subscribe(
			data=>{
				var serverPath = data.result[0]['serverPath'];
				this.downloadlinkSummary = hostname+"/"+serverPath;
				this.downloadingSummary = false;
				this.downloadedSummary = true;
				window.open(this.downloadlinkSummary,"_blank");
			},
			err=>{
	
			},
			()=>{

			}
		)
	}
	
	downloadreport(type,name){
		
		let navigationExtras: NavigationExtras = {
			queryParams:
				{
					"type":type,
					"name":name
				}
		};
		this.router.navigate(["/ac-reports/web-view"],navigationExtras);
	}
}
