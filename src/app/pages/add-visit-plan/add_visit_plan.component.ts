import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth,Monthly_forecast_targetApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import { FileUtil }  from '../../../providers/file.util';

@Component({
  templateUrl: 'add_visit_plan.component.html'
})

export class AddVisitPlanComponent {
	@ViewChild('upload') upload:any;
	csv:any = "";
	csvError = false;
	uploading = false;
	uploadedData:any;
	loading:any = "";
	
	userDetails:any;
	rolename:any;
	
	csvRecords = [];
	
	constructor(private monApi:Monthly_forecast_targetApi, private router:Router, private loopAuth:LoopBackAuth, private _fileUtil: FileUtil) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
  
	ngOnInit(): void {
    }
	
	uploadTarget(){
		
		var error = false;
		if(this.csv==""){	
			this.csvError = true;
			error = true;
		}else{
			this.csvError = false;
		}
		
		if(error ==  false){
			var lines = this.csv.split('\n');
			var headerValues = lines[0].split(','); // for column headings
			
			var jsonData = [];
			
			console.log(this.csv);
			
			for(var i=1; i<lines.length; i++){
				
				// if entire row is not blank, only then process it
				
				if(lines[i]!=""){
					var newArr = {};
					var columnValues = lines[i].split(',');
					
					for(var j=0;j<columnValues.length; j++){
						
						if(typeof(columnValues[j])!="undefined"){
							
							headerValues[j] = headerValues[j].replace(/[\n\r]+/g, '');
							columnValues[j] = columnValues[j].replace(/[\n\r]+/g, '');
							
							if(headerValues[j] == "target_date"){
								var dateParts = columnValues[j].split("/");
								columnValues[j] = moment(dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0]).format("YYYY-MM-DD");
							}
							newArr[headerValues[j]] = (columnValues[j])||0;
							
							var user_id = this.userDetails.userDet.id;
							newArr['user_id'] = user_id;
							newArr['rolename'] = this.rolename;
							
							jsonData[i-1] = newArr;
						}
						
					}
				}
				if(i+1 == lines.length){
					this.uploading = true;
					this.loading = "Loading";
					// rows to calculate no of columns to insert, and -6 bcuz 6 columns are for sph details
					//jsonData = JSON.stringify(jsonData);
					console.log(jsonData);
					this.monApi.insertMonthlyForecastTarget(jsonData,1).subscribe(
						data=>{
							this.loading = "";
							this.uploading = false;
							this.uploadedData = data.result;
						},
						err=>{
							this.loading = "Error Occured";
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
	}
}