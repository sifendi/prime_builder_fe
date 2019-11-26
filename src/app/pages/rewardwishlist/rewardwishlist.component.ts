import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackAuth,WishApi,App_hpbApi }   from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import 'rxjs/Rx';

@Component({
  templateUrl: 'rewardwishlist.component.html'
})
export class RewardwishlistComponent {
	busy:any;
	rewardData:any;
	ifEmpty:boolean = false;
	exportData:any = [];
	user_id:any;
	rolename:any;	
	allHpb:any=[];
	filteredHpb:any=[];
	maxDate:any;
	
	hpbName:any;
	cDate:any;
	reqDateFrom:any;
	reqDateTo:any;

	//variable for filter and pagination
	perPageLimit:any=10;
	offsetAuto:any=0;
	offset:any = 0;
	total:Number;
	paginationVal:boolean=true;
	hpbNameSearch:any;
	cDateSearch:any;
	reqDateFromSearch:any;
	reqDateToSearch:any;

	hpbNameErrors: boolean=false;
	
	constructor(private reward:WishApi, private loopAuth:LoopBackAuth, private router: Router,private hpbApi:App_hpbApi) {
		this.maxDate = new Date();
	}
  
	// Download CSV Sample Code
	download(){
		this.exportData= [];

		this.busy = this.reward.getWishlist(this.user_id,this.rolename,this.reqDateFromSearch,this.reqDateToSearch,this.hpbNameSearch,null,null).subscribe(
			data=>{
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<dataLength; i++){
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					var arr = {'HPB Name':data.result[i].sph_name, 'Wish':data.result[i].description, 'Created On':data.result[i].created_date};
					(this.exportData).push(arr);
				}
				var csvData = this.ConvertToCSV(this.exportData);
				var a = document.createElement("a");
				a.setAttribute('style', 'display:none;');
				document.body.appendChild(a);
				var blob = new Blob([csvData], { type: 'text/csv' });
				var url= window.URL.createObjectURL(blob);
				a.href = url;
				a.download = 'rewardList.csv';
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
	ngOnInit(): void {
		let userDetails = this.loopAuth.getCurrentUserData();
		let rolename;
		if(userDetails.userDet!==""){
		 rolename = userDetails.userDet.roles[0].name;
		}
		var user_id;
		if(rolename == "$ra"){
			this.user_id = userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.getCount(10,0,"","","");
	}
	paginate(event) {
		this.ifEmpty = false;
		this.offset=event.page;
		this.getCount(10,this.offset,this.hpbNameSearch,this.reqDateFromSearch,this.reqDateToSearch);
	}

	getCount(limit,offset,hpbName,reqDateFrom,reqDateTo){
		this.busy = this.reward.getWishlistCount(this.user_id,this.rolename,reqDateFrom,reqDateTo,hpbName).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.getData(limit,offset,hpbName,reqDateFrom,reqDateTo);
			},
			err=>{},	
			()=>{}
		)
	}

	searchData(){
		if(this.cDate){			
			this.reqDateFrom = moment(this.cDate).startOf('day').unix()*1000;
			this.reqDateTo = moment(this.cDate).endOf('day').unix()*1000;
		}else{
			this.reqDateFrom = "";
			this.reqDateTo = "";
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

		if(!this.hpbNameErrors){
			this.rewardData =[];
			if(this.hpbName){
				this.hpbNameSearch = this.hpbName.hpb_name;
			}else{
				this.hpbNameSearch = "";
			}
			if(this.reqDateFrom){
				this.reqDateFromSearch = this.reqDateFrom;
			}
			if(this.reqDateTo){
				this.reqDateToSearch = this.reqDateTo;
			}else{
				this.reqDateToSearch = "";
			}
			this.paginationVal=false;
			this.ifEmpty = false;
			this.offset = 0;
			this.getCount(this.perPageLimit,this.offset,this.hpbNameSearch,this.reqDateFromSearch,this.reqDateToSearch);
		}
	}

	resetPage(){
		this.paginationVal=false;
		this.offset = 0;
		this.ifEmpty = false;
		this.hpbName = "";
		this.cDate = null;

		this.hpbNameSearch = "";
		this.reqDateFromSearch = "";
		this.reqDateToSearch = "";
		this.hpbNameErrors = false;
		this.getCount(10,this.offset,"","","");
	}
	getData(limit,offset,hpbName,reqDateFrom,reqDateTo){
		this.exportData= [];
		this.busy = this.reward.getWishlist(this.user_id,this.rolename,reqDateFrom,reqDateTo,hpbName,limit,offset).subscribe(
			data=>{
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<dataLength; i++){
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					var arr = {'HPB Name':data.result[i].sph_name, 'Wish':data.result[i].description, 'Created On':data.result[i].created_date};
					(this.exportData).push(arr);
				}
				this.rewardData = data.result;
			},
			err=>{},
			()=>{}
		)
	}
	
	// goToHpb(id){
	// 	let navigationExtras:NavigationExtras = {
	// 		queryParams:{
	// 			"id":id
	// 		}
	// 	}
	// 	this.router.navigate(["/view-hpb"],navigationExtras);
	// }
	
	filterHpb(event){ 
		let query = event.query;
		this.busy = this.hpbApi.getHpb(null,null,null,null,null,null,null,null,null,null,null,null,this.perPageLimit,this.offsetAuto,null,null,null,query).subscribe((dataRes)=>{
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
}