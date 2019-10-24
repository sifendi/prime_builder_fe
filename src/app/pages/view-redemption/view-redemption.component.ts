import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackConfig, LoopBackAuth, RewardClaimApi } from '../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment';

@Component({
	selector: "ViewRedemption",
	templateUrl: 'view-redemption.component.html'
})
export class ViewRedemptionComponent {
	
	public id: number;
	rewardData: any = [];
	rejection:any;
	reasonError:any;
	reason:any;
	role:any = "";
	busy:any;
	
	constructor(private reward:RewardClaimApi, private route: ActivatedRoute, private loopAuth:LoopBackAuth) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });
		var userDetails = this.loopAuth.getCurrentUserData();
		if(userDetails && (userDetails.userDet.roles)){
			this.role = userDetails.userDet.roles[0]['name'];
		}
		console.log(userDetails);
		this.id = this.route.snapshot.params['id'];
	}

	ngOnInit(): void {
		console.log(this.id);
		this.busy = this.reward.getRedeemHistory("","","","","","","","","","",this.id).subscribe(
			data=>{
				if(data.result[0].status == "1"){
					data.result[0].status = "Approved";
					data.result[0].status_class = "success";
				}else if(data.result[0].status == "-1"){
					data.result[0].status = "Rejected";
					data.result[0].status_class = "danger";
				}else if(data.result[0].status == "0"){
					data.result[0].status = "Pending";
					data.result[0].status_class = "warning";
				}
				data.result[0].created_date = moment(data.result[0].created_date).format("DD MMM YYYY");
				this.rewardData = data.result[0];
				console.log("this.rewardData", this.rewardData);
			},
			err=>{},
			()=>{}
		)
	}
	
	approveRedemption(id,status){
		var error = false;
		this.reasonError = false;
		
		if(status  == -1){
			if(typeof(this.reason) == "undefined" || (this.reason == "")){
				this.reasonError = true;
				error = true;
			}
		}else{
			this.reason = "";
		}
		
		if(error == false){
			var userDetails = this.loopAuth.getCurrentUserData();
			
			var obj = { "status": status ,"rejected_reason":this.reason, "approved_by":userDetails.id };
			this.reward.addEditRedemption(obj,id).subscribe(
				data=>{
					window.location.reload();
				},
				err=>{
					
				},
				()=>{
					
				}
			);
		}
	}
	
	rejectNow(){
		this.rejection = true;
	}
	
	goBack(){
		this.rejection = false;
	}
}
