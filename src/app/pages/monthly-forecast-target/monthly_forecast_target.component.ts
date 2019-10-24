import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth, Monthly_forecast_targetApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

@Component({
  templateUrl: 'monthly_forecast_target.component.html'
})
export class MonthlyForecastTargetComponent {
	value:Date;
	busy:any;
	@ViewChild('visitDate') visitDate:any;
	
	visitorType:any = "";
	visitStatus:any = "";
	target:any = [];
	columns = ["Target Date","SPH","Visitor","Visitor Type"];
	columnsLength:any;
	allCols:any;
	allDataLength:any;
	ifEmpty:boolean=false;
	
	sphList: string[] = [];
    sphId: string[] = [];
	filteredSph: any[];
    sphSelected: string;
	
	visitorList: string[] = [];
    visitorId: string[] = [];
	filteredVisitor: any[];
    visitorSelected: string;
	userDetails:any;
	rolename:any;
	
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
	
	constructor(private monApi:Monthly_forecast_targetApi, private router:Router, private loopAuth:LoopBackAuth) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		this.value = new Date();
		this.visitorType = "";
		this.visitStatus = "";
	}
	
	ngAfterViewInit(): void {
		var user_id;
		if(this.rolename != "$sa"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.busy = this.monApi.getMonthlyForecastTargetHeaders().subscribe(
			data=>{
				var dataLength = data.result.length;
				
				for(var i=0; i<data.result.length; i++){
					this.columns.push(data.result[i].target_label);
				}
				this.allCols = data.result;
				this.allDataLength = dataLength;
				
				this.getData();
			},
			err=>{},
			()=>{}
		)
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
		
		var targetDate = "";
		if(this.value){
			targetDate = moment(this.value).format("YYYY-MM-DD");
		}
		
		var dataLength = this.allDataLength;
		var columns = this.allCols;
		var user_id;
		if((this.rolename == "$ra") || (this.rolename == "$ac")  || (this.rolename == "$tlh") ){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.busy = this.monApi.getMonthlyForecastTarget(null,targetDate,selected,this.visitorType,selectedVisitor,this.visitStatus,user_id,this.rolename).subscribe(
			data=>{
				var dataArr = [];
				var totalRows = data.result.length;
				if(totalRows == 0){
					this.ifEmpty = true;
				}else{
					this.ifEmpty = false;
				}
				var targetData = data.result;
				
				var idNum = 0;
				
				for(var i=0; i<dataLength; i++){ // for all columns
					
					for(var j=0; j<totalRows; j++){
						
						// new target found (sph-month-year)
						var uniqueId = targetData[j]["sph_id"]+'-'+targetData[j]["visitor_id"]+'-'+targetData[j]["target_date"];
						
						if(typeof(dataArr[uniqueId]) == "undefined"){ dataArr[uniqueId] = []; }
						dataArr[uniqueId]['date'] = moment(targetData[j]["target_date"]).format("DD-MM-YYYY");
						dataArr[uniqueId]['sph'] = targetData[j]["sph_name"];
						dataArr[uniqueId]['visitor'] = targetData[j]["visitor_name"];
						dataArr[uniqueId]['visitor_type'] = targetData[j]["visitor_type"];
						dataArr[uniqueId][columns[i].target_label] = "-";
						
						if(!(this.sphList.indexOf(targetData[j]["sph_name"]+" - "+targetData[j]["sph_mobile"])>=0)){
							this.sphList.push(targetData[j]["sph_name"]+" - "+targetData[j]["sph_mobile"]);
						}
						
						if(!(this.visitorList.indexOf(targetData[j]["visitor_name"]+" - "+targetData[j]["primary_mobile_no"])>=0)){
							this.visitorList.push(targetData[j]["visitor_name"]+" - "+targetData[j]["primary_mobile_no"]);
						}
					}
				}
				
				for(var i=0; i<dataLength; i++){ // for all columns
					
					for(var j=0; j<totalRows; j++){
						
						// new target found (sph-month-year)
						var uniqueId = targetData[j]["sph_id"]+'-'+targetData[j]["visitor_id"]+'-'+targetData[j]["target_date"];
						if(targetData[j]["target_label"] == columns[i].target_label){
							dataArr[uniqueId][columns[i].target_label] = targetData[j]["target_value"];
						}
					}
					
					if(i+1 == dataLength){
						this.target = dataArr;
					}
				}
			},
			err=>{
				
			},
			()=>{
				
			}
		)
	}
	
	replaceValue(value: string): string {
		let newValue = value.replace(/_/g, ' ');
		return newValue;
	}
}