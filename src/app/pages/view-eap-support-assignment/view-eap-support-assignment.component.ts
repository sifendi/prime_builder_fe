import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackConfig, LoopBackAuth, Eap_support_assignmentApi, App_usersApi } from '../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';
import { CookieService} from 'angular2-cookie/core';

@Component({
	templateUrl: 'view-eap-support-assignment.component.html'
})
export class ViewEapSupportAssignmentComponent {
	
	public id: number;
	@ViewChild('sphId') sphId: NgModel;
	sphIdErr:boolean = false;
	support: any = [];
	support_id:any;
	
	userDetails:any;
	rolename:any;
	
	allSph:any=[];
	filteredSph:any=[];
	sphCall:any;
	
	perPageLimit:any=10;
	offset:any=0;
	user_id:any;
	
	old_sph:any;
	sph_id:any;
	
	busy:any;
	
	constructor(private uApi:App_usersApi, private supportApi:Eap_support_assignmentApi, private route: ActivatedRoute, private loopAuth:LoopBackAuth, private _cookieService:CookieService) {
		this.route.queryParams.subscribe(params => {
			this.id = params["id"];
		});
	}

	ngOnInit(): void {
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		this.uApi.getUserRole(loginFlagToken).subscribe(
			data=>{
				this.rolename = data.result[0].name;
				this.user_id = data.result[0].uId;
				this.busy = this.supportApi.getEapsupportassignment({"lead_id":this.id}).subscribe(
					data=>{
						if(data.result[0].status == "1"){
							data.result[0].status = "Active";
						}else if(data.result[0].status == "0"){
							data.result[0].status = "Inactive";
						}
						data.result[0].created_date = moment(data.result[0].lead_date).format("DD MMM YYYY");
						data.result[0].lead_visit_date = moment(data.result[0].lead_visit_date).format("DD MMM YYYY");
						this.support_id = data.result[0].id;
						this.sph_id = {"id":data.result[0].sph_id, "realm":data.result[0].realm};
						this.old_sph = data.result[0].sph_id;
						this.support = data.result[0];
					},
					err=>{},
					()=>{}
				)
			},
			(err)=>{},
			()=>{}
		)
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
	
	submit(){
		if(this.sph_id.id > 0){
			
			// update the status to closed if old sph has to be deleted
			if(this.support_id){
				if(this.old_sph != this.sph_id){
					let para = {
						"updated_by":this.user_id,
						"status":0
					};
					this.supportApi.addEditSupportAssignment(para,this.support_id).subscribe(
						data=>{
							let para = {
								"lead_id":this.id,
								"sph_id":this.sph_id.id,
								"created_by":this.user_id,
								"updated_by":this.user_id,
								"status":1
							};
							
							this.supportApi.addEditSupportAssignment(para).subscribe(
								data=>{
									window.location.reload();
								},
								err=>{},
								()=>{}
							)
						},
						err=>{},
						()=>{}
					)
				}
			}else{
				let para = {
					"lead_id":this.id,
					"sph_id":this.sph_id.id,
					"created_by":this.user_id,
					"updated_by":this.user_id,
					"status":1
				};
				
				this.supportApi.addEditSupportAssignment(para).subscribe(
					data=>{
						window.location.reload();
					},
					err=>{},
					()=>{}
				)
			}
		}else{
			this.sphIdErr = true;
		}
	}
}
