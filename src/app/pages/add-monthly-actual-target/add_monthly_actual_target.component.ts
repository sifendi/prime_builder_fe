import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth,Monthly_actual_targetApi } from '../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import { FileUtil }  from '../../../providers/file.util';

@Component({
  templateUrl: 'add_monthly_actual_target.component.html'
})
export class AddMonthlyActualTargetComponent {
	loading:any = "";
	
	@ViewChild('month') month:any;
	@ViewChild('upload') upload:any;
	
	csv:any = "";
	csvError = false;
	monthError = false;
	uploading = false;
	
	uploadedData:any;
	userDetails:any;
	rolename:any;
	
	monthVal:any;
	yearVal:any;
	
	currentMonth:any;
	currentYear:any;
	year:any;
	years:any = [];
	monthsArr:any = [];
	fileError:any = "File must be CSV only";
	csvRecords = [];
	
	constructor(private monApi:Monthly_actual_targetApi, private router:Router, private loopAuth:LoopBackAuth, private _fileUtil: FileUtil) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		
		var months = ["","Jan","Feb","March","April","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
		var date = new Date();
		this.currentMonth = (date.getMonth())+1;
		this.currentYear = date.getFullYear();
		this.year = this.currentYear;
		
		for(var i=1; i<=12; i++){			
			this.monthsArr.push(months[i]);
		}
		
		// started from 2017
		var startYear = this.currentYear*1;
		var endYear = startYear+2;
		for(var i=startYear; i<=endYear; i++){
			this.years.push(i);
		}
		
		this.yearVal = this.currentYear;
		this.monthVal = this.currentMonth;
	}
  
	ngOnInit(): void {}
	
	uploadTarget(){
		var error = false;
		if(this.csv==""){	
			this.csvError = true;
			this.fileError = "File must be CSV only";
			error = true;
		}else{
			this.csvError = false;
		}
		
		let uploadDate:any = new Date(this.yearVal+"-"+this.monthVal+"-01");
		let uploadedDateStamp = Math.floor(uploadDate);
		
		let todayDate:any = new Date(this.currentYear+"-"+this.currentMonth+"-01");
		let todayDateStamp= Math.floor(todayDate);
		
		if(uploadedDateStamp < todayDateStamp){
			// this.monthError = true;
			// error = true;
			this.monthError = false;
		}else{
			this.monthError = false;
		}
		
		if(error ==  false){
			var lines = this.csv.split('\n');
			var headerValues = lines[0].split(','); // for column headings
			
			var jsonData = [];
			for(var i=1; i<lines.length; i++){
				var newArr = {};
				var columnValues = lines[i].split(',');
				
				var totalColumns = columnValues.length; // if they have put mandatory columns, only then add in the json
				if((headerValues.length < columnValues.length)){
					this.csvError = true;
					this.fileError = "File consists of issues. Special character detected.";
				} 
				
				if(!this.csvError)
				{
				if(totalColumns > 5){
					for(var j=0;j<totalColumns; j++){
						
						if(typeof(columnValues[j])!="undefined"){
							var user_id = this.userDetails.userDet.id;
							
							headerValues[j] = (headerValues[j].replace(/[\n\r]+/g, '')).trim();
							columnValues[j] = (columnValues[j].replace(/[\n\r]+/g, '')).trim();
								
							newArr[headerValues[j]] = (columnValues[j])||0;
							newArr['user_id'] = user_id;
							newArr['rolename'] = this.rolename;
							jsonData[i-1] = newArr;
						}
					}
				}
				if(i+1 == lines.length){
					this.uploading = true;
					this.loading = "Loading";
					
					// rows to calculate no of columns to insert, and -4 bcuz 4 columns are for sph details
					this.monApi.insertMonthlyTarget(jsonData,this.monthVal,this.yearVal,(headerValues.length-3)).subscribe(
						data=>{
							this.loading = "";
							this.uploading = false;
							this.uploadedData = data.result;
							console.log(data);
						},
						err=>{
							this.loading = "Error occured";
							this.uploading = false;
						},
						()=>{
							this.loading = "";
							this.uploading = false;
						}
					)
				}
				}
			}
		}
	}
	
	_onChange($event): void {

		var text = [];
		if(typeof($event.srcElement) != "undefined"){
			var files = $event.srcElement.files;
		}else{
			var files = $event.target.files;
		}
		
		if (this._fileUtil.isCSVFile(files[0])) {
		var input = $event.target;
		var reader = new FileReader();
		reader.readAsText(input.files[0]);

		reader.onload = (data) => {
		  let csvData = reader.result;
		  this.csv = csvData;
		  let csvRecordsArray = csvData.split(/\r\n|\n/);

		  let headersRow = this._fileUtil
			  .getHeaderArray(csvRecordsArray);
		   
		  this.csvRecords = this._fileUtil
			  .getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
		}

		reader.onerror = function () {
		  alert('Unable to read ' + input.files[0]);
		};

		} else {
		alert("Please import valid .csv file.");
		//this.fileReset();
		}
	};
	
	uploadAgain(){
		this.uploadedData = "";
		this.monthVal = this.currentMonth;
		this.yearVal = this.currentYear;
	}
}