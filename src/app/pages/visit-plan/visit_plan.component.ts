import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth,Monthly_forecast_targetApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

@Component({
  templateUrl: 'visit_plan.component.html'
})
export class VisitPlanComponent {
	value: Date;
	@ViewChild('visitDate') visitDate:any;
	visitorType:any = "";
	visitStatus:any="";
	dataEmpty:boolean = false;
	
	sphList: string[] = [];
    sphId: string[] = [];
	filteredSph: any[];
    sphSelected: string;
	
	visitorList: string[] = [];
    visitorId: string[] = [];
	filteredVisitor: any[];
    visitorSelected: string;
	
	target:any;
	busy:any;
	userDetails:any;
	rolename:any;
	
	constructor(private monApi:Monthly_forecast_targetApi, private router:Router, private loopAuth:LoopBackAuth) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		this.value = new Date();
		this.visitorSelected = "";
		this.visitorType = "";
		this.visitStatus = "";
	}
	
	filterSph(event) {
        this.filteredSph = [];
        for(let i = 0; i < this.sphList.length; i++) {
            let sphSelected = this.sphList[i];
            if(sphSelected.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.filteredSph.push(sphSelected);
            }
        }
    }
	
	filterVisitor(event) {
        this.filteredVisitor = [];
        for(let i = 0; i < this.visitorList.length; i++) {
            let visitorSelected = this.visitorList[i];
            if(visitorSelected.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.filteredVisitor.push(visitorSelected);
            }
        }
    }
	
	ngAfterViewInit(): void {
       this.getData();
    }
	
	resetData(){
		this.value = new Date();
		this.sphSelected = "";
		this.visitorSelected = "";
		this.visitorType = "";
		this.visitStatus = "";
		this.getData();
	}
	
	searchData(){
		this.getData();
	}
	
	getData(){
		this.target = [];
		
		this.sphList = [];
		this.sphId = [];
		
		this.visitorList = [];
		this.visitorId = [];
		
		var visitDate = "";
		if(this.value){
			visitDate = moment(this.value).format("YYYY-MM-DD");
		}
		
		if((this.sphSelected) && ((this.sphSelected).indexOf("-") >= 0)){
			var selectedArr = (this.sphSelected).split(" - ");
			var selected = selectedArr[1];
		}else{
			var selected = "";
		}
		
		if((this.visitorSelected) && ((this.visitorSelected).indexOf("-") >= 0)){
			var selectedArr = (this.visitorSelected).split(" - ");
			var selectedVisitor = selectedArr[1];
		}else{
			var selectedVisitor = "";
		}
		
		var user_id;
		if(this.rolename != "$sa"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.busy = this.monApi.getMonthlyForecastVisitingTarget("",visitDate,selected,this.visitorType,selectedVisitor,this.visitStatus,user_id,this.rolename).subscribe(
			data=>{
				
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.target = [];
					this.dataEmpty = true;
				}else{
					this.dataEmpty = false;
					for(var i=0; i<dataLength; i++){
						data.result[i]['target_date'] = moment(data.result[i]['target_date']).format("DD-MM-YYYY");
						if(data.result[i]['status'] == 1){
							data.result[i]['status'] = "Active";
						}else{
							data.result[i]['status'] = "Inactive";
						}
						
						if(!(this.sphList.indexOf(data.result[i]["sph_name"]+" - "+data.result[i]["sph_mobile"])>=0)){
							this.sphList.push(data.result[i]["sph_name"]+" - "+data.result[i]["sph_mobile"]);
						}
						
						if(!(this.visitorList.indexOf(data.result[i]["visitor_name"]+" - "+data.result[i]["holcim_id"])>=0)){
							this.visitorList.push(data.result[i]["visitor_name"]+" - "+data.result[i]["holcim_id"]);
						}
						
						if(i+1 == dataLength){
							this.target = data.result;
						}
					}
				}
			},
			err=>{
				
			},
			()=>{
				
			}
		)
	}
		
}
