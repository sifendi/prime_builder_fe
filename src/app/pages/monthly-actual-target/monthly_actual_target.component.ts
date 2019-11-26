import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth,Monthly_actual_targetApi } from '../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';

@Component({
  templateUrl: 'monthly_actual_target.component.html'
})
export class MonthlyActualTargetComponent {
	busy:any;
	target:any;
	targetSph:any;
	columnsSph = ["SPH","Month","Year"];
	columns = [];
	allCols:any;
	allDataLength:any;
	
	sphList: string[] = [];
    sphId: string[] = [];
	filteredBrands: any[];
    
    sphSelected: string;
	
	monthVal:any;
	yearVal:any;
	
	currentMonth:any;
	currentYear:any;
	year:any;
	years:any = [];
	monthsArr:any = [];
	months:any = [];
	
	@ViewChild('status') status:any;
	ifEmpty:boolean=false;
	userDetails:any;
	rolename:any;
	totalRows:Number = 0;
	
	filterBrands(event) {
        this.filteredBrands = [];
        for(let i = 0; i < this.sphList.length; i++) {
            let sphSelected = this.sphList[i];
            if(sphSelected.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
				this.filteredBrands.push(sphSelected);
            }
        }
    }
	
	captureId(event){}
	
	constructor(private monApi:Monthly_actual_targetApi, private router:Router, private loopAuth:LoopBackAuth) {
		
		this.months = ["","Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		var date = new Date();
		this.monthVal = this.currentMonth = (date.getMonth())+1;
		this.currentYear = date.getFullYear();
		this.yearVal = this.year = this.currentYear;
		
		for(var i=1; i<=12; i++){			
			this.monthsArr.push(this.months[i]);
		}
		// started from 2017
		for(var i=2017; i<=this.currentYear; i++){
			this.years.push(i);
		}
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
  
	ngAfterViewInit(): void {
        this.busy = this.monApi.getMonthlyTargetHeaders().subscribe(
			data=>{
				
				var dataLength = data.result.length;
				var columns = data.result;
				
				this.allCols = columns;
				this.allDataLength = dataLength;
				this.resetData();
			},
			err=>{},
			()=>{}
		)
    }

	resetData(){
		this.monthVal = this.currentMonth;
		this.yearVal = this.currentYear;
		this.status = "";
		this.sphSelected = null;
		this.getData();
	}
	
	searchData(){
		this.getData();
	}	
	
	getData(){
		this.target = [];
		this.sphList = [];
		this.sphId = [];
		
		if((this.sphSelected) && ((this.sphSelected).indexOf("-") >= 0)){
			var selectedArr = (this.sphSelected).split(" - ");
			var selected = selectedArr[1];
		}else{
			var selected = "";
		}
		
		var dataLength = this.allDataLength;
		var columns = this.allCols;
		
		var user_id;
		if(this.rolename != "$sa"){
			user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		
		this.busy = this.monApi.getMonthlyTarget("",this.monthVal,this.yearVal,this.status,selected,user_id,this.rolename).subscribe(
			data=>{
				var dataArr = [];
				var sphArr = [];
				this.totalRows = data.result.length;
				console.log(this.totalRows);
				
				var targetData = data.result;
				if(this.totalRows == 0){
					this.ifEmpty = true;
				}else{
					this.ifEmpty = false;
				}
				var idNum = 0;
				
				for(var i=0; i<dataLength; i++){ // for all columns
					
					for(var j=0; j<this.totalRows; j++){
						
						// new target found (sph-month-year)
						var uniqueId = targetData[j]["sph_id"]+'-'+this.months[targetData[j]["target_month"]]+'-'+targetData[j]["target_year"];
						if(!(this.sphList.indexOf(targetData[j]["realm"]+" - "+targetData[j]["sph_mobile"])>=0)){
							this.sphList.push(targetData[j]["realm"]+" - "+targetData[j]["sph_mobile"]);
						}
						if(typeof(dataArr[uniqueId]) == "undefined"){ dataArr[uniqueId] = []; }
						if(typeof(sphArr[uniqueId]) == "undefined"){ sphArr[uniqueId] = []; }
						sphArr[uniqueId]['sph'] = targetData[j]["realm"];
						sphArr[uniqueId]['month'] = this.months[targetData[j]["target_month"]];
						sphArr[uniqueId]['year'] = targetData[j]["target_year"];
						dataArr[uniqueId][columns[i].target_label] = "0";
					}
				}
				
				for(var i=0; i<dataLength; i++){ // for all columns
					
					for(var j=0; j<this.totalRows; j++){
						
						// new target found (sph-month-year)
						var uniqueId = targetData[j]["sph_id"]+'-'+this.months[targetData[j]["target_month"]]+'-'+targetData[j]["target_year"];
						console.log("targetData[j]['target_label']====>",targetData[j]["target_label"]);
						console.log("columns[i].target_label====>",columns[i].target_label);
						if(targetData[j]["target_label"] == columns[i].target_label){
							dataArr[uniqueId][columns[i].target_label] = targetData[j]["target_value"];
						}
					}
					
					if(i+1 == dataLength){
						this.target = dataArr;
						this.targetSph = sphArr;
						console.log(this.target);
					}
				}
				console.log("this.target====>",this.target);
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
