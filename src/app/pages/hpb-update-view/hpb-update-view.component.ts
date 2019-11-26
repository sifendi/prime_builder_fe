import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Hpb_update_approvalApi } from '../../../shared/loopback_sdk';
import { LoopBackConfig, LoopBackAuth } from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
  templateUrl: 'hpb-update-view.html',
  providers: [ConfirmationService]
})
export class HpbUpdateComponent {
	updateUserHistory:any=[];
	busy:any;
	public id: number;
	prodrecData:any = [];
	msgs: any = [];
	invoice_photo_array: any = [];

	tlhApproval:any = [];
	acApproval:any = [];
	saApproval:any = [];
	approvalDetails:any = [];
	updateUserData:any=[];
	
	ifApproval:boolean = true;
	rejection:boolean = false;
	reasonError:boolean = false;
	reason:any = "";
	loggedinrole:any;
	user_id:any;
	
	constructor( private confirmationService: ConfirmationService,private hpbUA:Hpb_update_approvalApi, private route: ActivatedRoute,private router: Router, private loopAuth:LoopBackAuth) {
		this.id = this.route.snapshot.params['id'];
		var userDetails = this.loopAuth.getCurrentUserData();
		if(userDetails && (userDetails.userDet.roles)){
			this.loggedinrole = userDetails.userDet.roles[0]['name'];
			this.user_id = userDetails.id;
		}
	}
  
	ngOnInit(): void {
		if(this.loggedinrole == "$ra"){
			let para = {
				"id":this.id,
			}
			this.busy=this.hpbUA.getUpdateHpb(para,this.user_id).subscribe(
				data=>{
					var dataLength = data.result.length;
					if(dataLength > 0){
						if(data.result[0].approval_status == 0){
							data.result[0].status = "Pending";
							data.result[0].classname = "warning";
						}else if(data.result[0].approval_status == 1){
							data.result[0].status = "Approved";
							data.result[0].classname = "success";
						}else if(data.result[0].approval_status == -1){
							data.result[0].status = "Rejected";
							data.result[0].classname = "danger";
						}else{
							data.result[0].status = "";
							data.result[0].classname = "";
						}
						if(data.result[0].field_name == 'Mobile'){
							data.result[0].label_name = 'Mobile';
						}else{
							data.result[0].label_name = 'Card';
						}

						data.result[0].updated_date = moment(data.result[0].updated_date).format("DD MMM YYYY");
						data.result[0].created_date = moment(data.result[0].created_date).format("DD MMM YYYY");
					}
					this.updateUserData = data.result[0];
					this.getHistory(data.result[0].hpb_id, data.result[0].field_name);
				},
				err=>{
				},
				()=>{

				}
			);
		}
  	}

	getHistory(hpb_id, fieldName){
		if(this.id > 0){
			var para = {
				"hpb_id" : hpb_id,
				"is_closed":'1',
				"field_name":fieldName
			}

			this.busy=this.hpbUA.getUpdateHpb(para,this.user_id).subscribe(
				data=>{
					var dataLength = data.result.length;
					for(var i = 0; i<dataLength; i++){
						if(data.result[i].approval_status == 0){
							data.result[i].status = "Pending";
							data.result[i].classname = "btn-warning";
						}else if(data.result[i].approval_status == 1){
							data.result[i].status = "Approved";
							data.result[i].classname = "btn-success";
						}else if(data.result[i].approval_status == -1){
							data.result[i].status = "Rejected";
							data.result[i].classname = "btn-danger";
						}else{
							data.result[i].status = "";
							data.result[i].classname = "";
						}
						data.result[i].updated_date = moment(data.result[i].updated_date).format("DD MMM YYYY");
						data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
						this.updateUserHistory=data.result;
					}
				},
				err=>{

				},
				()=>{

				}
			)
		}
	}
	
	approveHpbStatus(id,status){
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
			var obj = { 
				"approval_status": status ,
				"rejection_reason":this.reason, 
				"updated_by":this.user_id,
				"approved_by":this.user_id,
			};
			this.busy = this.hpbUA.addEditHpbUpadteApproval(obj,id).subscribe(
				data=>{
					this.router.navigate(['/users/hpb-update-approval']);
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

	confirm(id,status) {
		console.log(id,status);
		this.confirmationService.confirm({
			message: 'Are you sure that you want to Approve?',
			header: 'Approve Request',
			accept: () => {			
				this.approveHpbStatus(id,status);
			}
		});
	}

	reject(id,status) {
		console.log(id,status);
		this.confirmationService.confirm({
			message: 'Are you sure that you want to Reject?',
			header: 'Reject Request',
			accept: () => {
				if(status == -1){
					this.rejectNow();
				}else{
					this.approveHpbStatus(id,status);
				}
			}
		});
	}
}