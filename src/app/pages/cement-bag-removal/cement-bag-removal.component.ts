import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackConfig, LoopBackAuth,Cement_bag_removals_tblApi, DistrictApi }  from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';

@Component({
  templateUrl: 'cement-bag-removal.component.html'
})
export class CementBagRemovalComponent {
	busy:any;
	removal:any;
	display:boolean = false;
	submitted:boolean=false;
	ifEmpty:boolean = false;
	removal_from:Date;
	removal_to:Date;
	district_id:any;
	date_from:any;
	date_to:any;
	userDetails:any;
	rolename:any;
	user_id:Number = 0;
	paginationVal:any = true;
	total:any;
	offset:any = 0;
	allDistrict:any=[];
	filteredDistrict:any=[];
	disCall:any;
	perPageLimit:any=10;
	offsetAuto:any=0;
	maxDate:Date;
	date_toSearch: any="";
	date_fromSearch: any="";
	district_idSearch: any="";
	districtErrors: boolean=false;

	constructor(private cementApi:Cement_bag_removals_tblApi,private router: Router,private loopAuth:LoopBackAuth,private dApi:DistrictApi){
		this.maxDate = new Date();
	}

	ngAfterViewInit(): void {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		
		if(this.rolename == "$ra"){
			this.user_id = this.userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
		this.getCount(0,10,"","",null);
	}

	paginate(event) {
        this.removal = [];
		this.offset=event.page;
		if(this.date_fromSearch || this.date_toSearch){
			this.getRemovalData(this.offset,10,this.date_fromSearch,this.date_toSearch,this.district_idSearch);
		}else{
			this.getRemovalData(0,10,"","",this.district_idSearch);
		}
	}

	searchData(){
		if(this.district_id){
			if(this.district_id.id != "" && this.district_id.id != undefined){
				this.districtErrors = false;
			}else{
				this.districtErrors = true;
			}
		}else{
			this.districtErrors = false;
		}
		if(this.removal_from){			
			this.date_from = moment(this.removal_from).startOf('day').unix()*1000;
		}else{
			this.date_from = "";
		}
		if(this.removal_to){
			this.date_to = moment(this.removal_to).endOf('day').unix()*1000;
		}else{
			this.date_to = "";
		}
		if(!this.districtErrors){
			this.district_idSearch = this.district_id;
			this.date_fromSearch = this.date_from;
			this.date_toSearch = this.date_to;
			this.removal =[];
			this.offset = 0;
			this.paginationVal = false;
			this.ifEmpty = false;
			this.getCount(0,10,this.date_fromSearch,this.date_toSearch,this.district_idSearch);
		}
	}

	resetData(){
		this.paginationVal=false;
		this.offset = 0;
		this.removal_from = null;
		this.removal_to = null;
		this.date_from = null;
		this.date_to = null;
		this.ifEmpty = false;
		this.district_id = null;
		this.date_fromSearch = null;
		this.date_toSearch = null;
		this.district_idSearch = null;
		this.districtErrors = false;
		this.getCount(0,10,"","",null);
	}

	getCount(offset,limit,datefrom,dateto,districtId){
		if(districtId){
			districtId = districtId.id;
		}
		this.busy = this.cementApi.getCementBagRemovalCount("",districtId,datefrom,dateto,"","","","","","",this.rolename,this.user_id).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal=true;
				}
				this.getRemovalData(offset,limit,datefrom,dateto,districtId);
			},
			err=>{},	
			()=>{}
		)
	}

	getRemovalData(offset,limit,datefrom,dateto,districtId){
		this.busy = this.cementApi.getCementBagRemoval("",districtId,datefrom,dateto,"","","","",limit,offset,this.rolename,this.user_id).subscribe((data:any)=>{
			var dataLength = data.result.length;
			if(dataLength == 0){
				this.ifEmpty = true;
			}
			for(var i=0; i<dataLength; i++){
				data.result[i].from_date = moment(data.result[i].from_date).format("DD MMM YY");
				data.result[i].to_date = moment(data.result[i].to_date).format("DD MMM YY");
			}
			this.removal=data.result;
		},
		err=>{

		},
		()=>{

		});
	}

	showDialog() { 
		this.display = true;
	}

	// viewProd(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 		}
	// 	};
    
	// 	this.router.navigate(["view-cement-bag-removal"], navigationExtras);
	// }

	filterDistrict(event){ 
		let query = event.query;
		if(this.disCall){
			this.disCall.unsubscribe();
		}
		this.busy = this.disCall = this.dApi.getDistrict(this.perPageLimit,this.offsetAuto,null,null,query).subscribe((dataRes)=>{
			this.allDistrict = dataRes['result']; 
			this.filteredDistrict = this.filterAutocompleteDisData(query, this.allDistrict,'name');
		});
	}

	filterAutocompleteDisData(query, filterAllData: any[],keyName):any[] {
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