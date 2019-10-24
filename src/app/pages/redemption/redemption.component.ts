import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoopBackAuth,RewardClaimApi,App_usersApi,Retrieve_created_byApi,App_hpbApi }   from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import {PaginatorModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

@Component({
  templateUrl: 'redemption.component.html'
})
export class RedemptionComponent {
	createdByErrors: boolean;
	hpbNameErrors: boolean;
	busy:any;
	exportData:any = [];

	rewardName:any;
	hpbName:any;
	name:any;
	cDate:Date;
	aprvStatus:any = "";
	reqDateFrom:any;
	reqDateTo:any;

	offset:any=0;
	total:Number=0;
	rewardData:any;
	ifEmpty:boolean = false;
	paginationVal:boolean=true;
	userDetails:any;
	rolename:any;
	user_id:any;
	userList:any;
	
	allUsersFullName:any=[];
	filteredUserFullName:any=[];
	allHpb:any=[];
	filteredHpb:any=[];
	hpbCall:any;
	
	perPageLimit:any=10;
	//offsetAuto:any=0;
	maxDate:any;

	//variable for pagination and filters
	rewardNameSearch:any="";
	hpbNameSearch:any="";
	nameSearch:any="";
	cDateSearch:any="";
	aprvStatusSearch:any = "";
	reqDateFromSearch:any="";
	reqDateToSearch:any="";
	
	constructor(private uApi:App_usersApi, private hpbApi:App_hpbApi,private createdApi:Retrieve_created_byApi,private reward:RewardClaimApi, private router: Router, private loopAuth:LoopBackAuth) {
		this.maxDate = new Date();
	}
	
	// viewProd(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-redemption"], navigationExtras);
	// }
	ngOnInit(): void {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		if(this.rolename == "$ra"){
			this.user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.getCount(10,0,"","","","","","");
    }

	// Download CSV Sample Code
	download(){
		this.exportData= [];
		this.busy = this.reward.getRedeemHistory("","","",this.aprvStatusSearch,this.nameSearch,"",null,null,this.user_id,this.rolename,"",this.hpbNameSearch,this.rewardNameSearch,this.reqDateFromSearch,this.reqDateToSearch).subscribe(
			data=>{
				var dataLength = data.result.length;
				for(var i=0; i<dataLength; i++){
					
					if(data.result[i].status == 0){
						data.result[i].status = "Pending";
						data.result[i].classname = "btn-warning";
					}else if(data.result[i].status == 1){
						data.result[i].status = "Approved";
						data.result[i].classname = "btn-success";
					}else if(data.result[i].status == -1){
						data.result[i].status = "Rejected";
						data.result[i].classname = "btn-danger";
					}
					
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					data.result[i].updated_date = moment(data.result[i].updated_date).format("DD MMM YYYY");
					
					if(data.result[i].totalpoints == null){
						data.result[i].totalpoints = 0;
					}
					var arr = {'HPB Name':data.result[i].hpb_name, 'Reward Name':data.result[i].reward_name, 'Points Redeemed':data.result[i].points_redeemed, 'Redemption Status': data.result[i].status , 'Total Points': data.result[i].totalpoints, 'Created By':data.result[i].sph_name, 'Created On':data.result[i].created_date};
					(this.exportData).push(arr);
				}
				var csvData = this.ConvertToCSV(this.exportData);
				var a = document.createElement("a");
				a.setAttribute('style', 'display:none;');
				document.body.appendChild(a);
				var blob = new Blob([csvData], { type: 'text/csv' });
				var url= window.URL.createObjectURL(blob);
				a.href = url;
				a.download = 'redemptionList.csv';
				a.click();
			},
			err=>{},
			()=>{}
		);
	}

	// convert Json to CSV data in Angular2
	ConvertToCSV(objArray) {
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
		var str = '';
		var row = "";

		for (var index in objArray[0]) {
				//Now convert each value to string and comma-separated
				row += index + ',';
		}
		row = row.slice(0, -1);
		//append Label row with line break
		str += row + '\r\n';

		for (var i = 0; i < array.length; i++) {
				var line = '';
				for (var index in array[i]) {
						if (line != '') line += ','

						line += array[i][index];
				}
				str += line + '\r\n';
		}
		return str;
	}

	paginate(event) {
		this.ifEmpty = false;
		this.offset=event.page;
		this.getCount(10,this.offset,this.hpbNameSearch,this.rewardNameSearch,this.aprvStatusSearch,this.nameSearch,this.reqDateFromSearch,this.reqDateToSearch);
	}

	getCount(limit,offset,hpbName,rewardName,aprvStatus,CreatedBy,reqDateFrom,reqDateTo){
		this.busy = this.reward.getRedeemHistoryCount("","","",aprvStatus,CreatedBy,"","","",this.user_id,this.rolename,hpbName,rewardName,reqDateFrom,reqDateTo).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(limit,offset,hpbName,rewardName,aprvStatus,CreatedBy,reqDateFrom,reqDateTo);
			},
			err=>{},	
			()=>{}
		)
	}

	searchData(){
		if(this.cDate){			
			this.reqDateFrom = moment(this.cDate).startOf('day').unix()*1000;
			this.reqDateTo = moment(this.cDate).endOf('day').unix()*1000;
			this.reqDateFromSearch = this.reqDateFrom;
			this.reqDateToSearch = this.reqDateTo;
		}else{
			this.reqDateFrom = "";
			this.reqDateTo = "";
			this.reqDateFromSearch = "";
			this.reqDateToSearch = "";
		}

		if(this.hpbName){
			if(this.hpbName.hpb_name != "" && this.hpbName.hpb_name != undefined){
				this.hpbNameErrors = false;
			}else{
				this.hpbNameErrors = true;
			}
		}else{
			this.hpbNameErrors = false;
		}

		if(this.name){
			if(this.name.user_id != "" && this.name.user_id != undefined){
				this.createdByErrors = false;
			}else{
				this.createdByErrors = true;
			}
		}else{
			this.createdByErrors = false;
		}

		if(!this.hpbNameErrors && !this.createdByErrors){
			this.rewardData =[];
			this.offset = 0;
			this.paginationVal=false;
			this.ifEmpty = false;
			if(this.name){
				this.nameSearch = this.name.user_id;
			}else{
				this.nameSearch = "";
			}
			if(this.hpbName){
				this.hpbNameSearch = this.hpbName.hpb_name;
			}else{
				this.hpbNameSearch = "";
			}
			this.rewardNameSearch = this.rewardName;
			this.aprvStatusSearch = this.aprvStatus;
			this.getCount(10,0,this.hpbNameSearch,this.rewardNameSearch,this.aprvStatusSearch,this.nameSearch,this.reqDateFromSearch,this.reqDateToSearch);
		}
	}

	resetPage(){
		this.paginationVal=false;
		this.offset=0;
		this.ifEmpty = false;
		this.aprvStatus = "";
		this.name = "";
		this.rewardName = "";
		this.hpbName = "";
		this.cDate = null;
		this.aprvStatusSearch = "";
		this.nameSearch = "";
		this.rewardNameSearch = "";
		this.hpbNameSearch = "";
		this.reqDateFromSearch = "";
		this.reqDateToSearch = "";
		this.createdByErrors = false;
		this.hpbNameErrors = false;
		this.getCount(10,0,"","","","","","");
	}

	getData(limit,offset,hpbName,rewardName,aprvStatus,CreatedBy,reqDateFrom,reqDateTo){
		this.exportData = [];
		this.busy = this.reward.getRedeemHistory("","","",aprvStatus,CreatedBy,"",10,offset,this.user_id,this.rolename,"",hpbName,rewardName,reqDateFrom,reqDateTo).subscribe(
			data=>{
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<dataLength; i++){
					if(data.result[i].status == 0){
						data.result[i].status = "Pending";
						data.result[i].classname = "btn-warning";
					}else if(data.result[i].status == 1){
						data.result[i].status = "Approved";
						data.result[i].classname = "btn-success";
					}else if(data.result[i].status == -1){
						data.result[i].status = "Rejected";
						data.result[i].classname = "btn-danger";
					}
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					data.result[i].updated_date = moment(data.result[i].updated_date).format("DD MMM YYYY");
					
					if(data.result[i].totalpoints == null){
						data.result[i].totalpoints = 0;
					}
					
					// for export data
					var arr = {'HPB Name':data.result[i].hpb_name, 'Reward Name':data.result[i].reward_name, 'Points Redeemed':data.result[i].points_redeemed, 'Redemption Status': data.result[i].status , 'Total Points': data.result[i].totalpoints, 'Created By':data.result[i].sph_name, 'Created On':data.result[i].created_date};
					(this.exportData).push(arr);
				}
				this.rewardData = data.result;	
			},
			err=>{},
			()=>{}
		)
	}	

	filterFullName(event){ 
		let query = event.query;
		this.busy = this.createdApi.getCreatedBy("reward_claims_tbl",this.perPageLimit,this.offset,query).subscribe((dataRes)=>{
			this.allUsersFullName = dataRes['result']; 
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName,'sph_name');
		});
	}

	filterHpb(event){ 
		let query = event.query;
		if(this.hpbCall){
			this.hpbCall.unsubscribe();
		}
		this.hpbCall = this.busy = this.hpbApi.getHpb(null,null,null,null,null,null,null,null,null,null,null,null,this.perPageLimit,this.offset,null,null,null,query).subscribe((dataRes)=>{
			this.allHpb = dataRes['result']; 
			this.filteredHpb = this.filterAutocompleteData(query, this.allHpb,'hpb_name');
		});
	}

	filterAutocompleteData(query, filterAllData: any[],keyName):any[] {
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

	// goToHpb(id){
	// 	let navigationExtras:NavigationExtras = {
	// 		queryParams:{
	// 			"id":id
	// 		}
	// 	}
	// 	this.router.navigate(["/view-hpb"],navigationExtras);
	// }
}