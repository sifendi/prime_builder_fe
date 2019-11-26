import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackConfig, LoopBackAuth, Eap_support_assignmentApi,App_usersApi }   from '../../../shared/loopback_sdk';
import { CookieService} from 'angular2-cookie/core';

@Component({
  templateUrl: 'eap-support-assignment.component.html'
})

export class EapSupportAssignmentComponent {
	busy:any;
	display:boolean = false;
	submitted:boolean=false;
	
	proData:any;
	offset:any = 0;
	total:any;
	paginationVal:any=true;
	
	sph_id:any;
	lead_id:any;
	result:any;
	
	allLead:any=[];
	filteredLead:any=[];
	leadCall:any;
	
	allSph:any=[];
	filteredSph:any=[];
	sphCall:any;
	
	perPageLimit:any=10;
	offsetAuto:any=0;
	
	user_id:any;
	userDetails:any;
	rolename:any;
	
	constructor(private uApi:App_usersApi,private _cookieService:CookieService,private proApi:Eap_support_assignmentApi, private router: Router,private loopAuth:LoopBackAuth){
		
	}
  
	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};  
		this.router.navigate(["view-eap-support-assignment"], navigationExtras);
	}

	paginate(event) {
		this.proData = [];
		this.offset=event.page;
		
		let sphId = "";
		if(this.sph_id){
			sphId = this.sph_id.id;
		}
		
		let lead = "";
		if(this.lead_id){
			lead = this.lead_id.leadId;
		}
		this.getCount(10,this.offset,lead,sphId);
	}

	ngAfterViewInit(): void {
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		this.uApi.getUserRole(loginFlagToken).subscribe(
			data=>{
				this.rolename = data.result[0].name;
				this.user_id = data.result[0].uId;
				this.getCount(10,"","","");
			},
			(err)=>{},
			()=>{}
		)
	}

	searchData(){
		let sphId = "";
		if(this.sph_id){
			sphId = this.sph_id.id;
		}
		
		let lead = "";
		if(this.lead_id){
			lead = this.lead_id.leadId;
		}
		this.getCount(10,0,lead,sphId);
	}

	getCount(limit,offset,lead,sph){
		let para = {
			"lead_id":lead,
			"sph_id":sph
		};
		this.busy = this.proApi.getEapsupportassignmentCount(para,this.user_id,this.rolename).subscribe(
		data=>{
			this.total = data.result[0].total;
			if(this.total <= 10){
				this.paginationVal = false;
			}else{
				this.paginationVal = true;
			}
			this.proData = [];
			this.getData(limit,offset,lead,sph)
		},
		err=>{},
		()=>{}
		)
	}
	
	getData(limit,offset,lead,sph){
		let para = {
			"lead_id":lead,
			"sph_id":sph,
			"limit":limit,
			"page":offset
		};
		
		this.busy = this.proApi.getEapsupportassignment(para,this.user_id,this.rolename).subscribe(
			data=>{
				var dataLength = data.result.length;
				for(var i=0; i<dataLength; i++){
					if(data.result[i]['status'] == 1){
						data.result[i]['status'] = "Active";
					}else if(data.result[i]['status']  == 0){
						data.result[i]['status'] = "Inactive";
					}
				}
				this.proData = data.result;
			},
			err=>{

			},
			()=>{

			}
		)
	}
	
	resetData(){
		this.lead_id = "";
		this.sph_id = "";    
		this.offset = 0;
		this.paginationVal = false;
		this.getCount(10,this.offset,"","");
	}
	
	filterAutocompleteData(query, filterAllData: any[],keyName):any[] {
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
	
	filterSph(event){ 
		let query = event.query;
		this.uApi.getUsersDashboard(null,"SPH",query,this.perPageLimit,this.offset,null,this.user_id).subscribe((dataRes)=>{
			this.allSph = dataRes['result']; 
			this.filteredSph = this.filterAutocompleteData(query, this.allSph,'realm');
		});
	}
	
	filterLead(event){ 
		let query = event.query;
		let para = {
			"lead_name":query,
			"page":this.offset,
			"limit":this.perPageLimit
		};
		this.proApi.getEapsupportassignment(para).subscribe((dataRes)=>{
			this.allLead = dataRes['result']; 
			this.filteredLead = this.filterAutocompleteData(query, this.allLead,'lead_name');
		});
	}
}