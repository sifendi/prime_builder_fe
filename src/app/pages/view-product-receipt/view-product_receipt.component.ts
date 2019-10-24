import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_product_receiptApi, App_product_receipt_approvalApi } from '../../../shared/loopback_sdk';
import { LoopBackConfig, LoopBackAuth } from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

@Component({
  templateUrl: 'view-product_receipt.component.html',
  providers: [ConfirmationService]
})
export class ViewProductReceiptComponent {
	busy:any;
	
	public id: number;
	prodrecData:any = [];
	msgs: any = [];
	invoice_photo_array: any = [];

	tlhApproval:any = [];
	acApproval:any = [];
	saApproval:any = [];
	approvalDetails:any = [];
	
	ifApproval:boolean = true;
	rejection:boolean = false;
	reasonError:boolean = false;
	reason:any = "";
	pageLink:any;
	
	constructor( private confirmationService: ConfirmationService,private ProdRec:App_product_receiptApi,private route: ActivatedRoute, private prodApp: App_product_receipt_approvalApi, private loopAuth:LoopBackAuth) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// 	this.pageLink = params["page"];
		// 	if(this.pageLink == "all"){
		// 		this.pageLink = "/product-receipt";
		// 	}else{
		// 		this.pageLink = "/pending-product-receipt";
		// 	}
		// });

		this.id = this.route.snapshot.params['id'];
		this.pageLink = this.route.snapshot.params['page'];
		if(this.pageLink == "all"){
			this.pageLink = "/product-receipt";
		}else{
			this.pageLink = "/pending-product-receipt";
		}
	}
  
	ngOnInit(): void {
		this.busy = this.ProdRec.getProductReceiptWithApproval(this.id).subscribe(
			data=>{
				if(data.result[0].is_srku == 1){
					data.result[0].is_srku = "Yes";
				}else{
					data.result[0].is_srku = "No";
				}
				if(data.result!=""){
					var invoice_photo_obj;
					if(data.result[0].invoice_image){
						invoice_photo_obj = JSON.parse(data.result[0].invoice_image);
						invoice_photo_obj.forEach(element => {
							this.invoice_photo_array.push({"path":element['serverPath'],"fileType":element['fileType']});
						});
						data.result[0].invoice_photo_array = this.invoice_photo_array;
					}
					if(data.result[0].digital_sign){
						data.result[0].digital_sign = JSON.parse(data.result[0].digital_sign)[0].serverPath;
					}else{
						data.result[0].digital_sign = '';
					}
					
					this.ifApproval = true;
					
					if(data.result[0].app.tlh){
						if(data.result[0].app.tlh.approval_status == 0){
							data.result[0].app.tlh.approval_status = "Pending";
							data.result[0].app.tlh.approval_class = "warning";
							this.ifApproval = false;
						}else if(data.result[0].app.tlh.approval_status == 1){
							data.result[0].app.tlh.approval_status = "Approved";
							data.result[0].app.tlh.approval_class = "success";
						}else if(data.result[0].app.tlh.approval_status == -1){
							this.ifApproval = false;
							data.result[0].app.tlh.approval_status = "Rejected";
							data.result[0].app.tlh.approval_class = "danger";							
							data.result[0].app.tlh.rejection_reason = data.result[0].app.rejection_reason
						}
					}
					
					if(data.result[0].app.ac){
						if(data.result[0].app.ac.approval_status == 0){
							data.result[0].app.ac.approval_status = "Pending";
							data.result[0].app.ac.approval_class = "warning";
							this.ifApproval = false;
						}else if(data.result[0].app.ac.approval_status == 1){
							data.result[0].app.ac.approval_status = "Approved";
							data.result[0].app.ac.approval_class = "success";
						}else if(data.result[0].app.ac.approval_status == -1){
							this.ifApproval = false;
							data.result[0].app.ac.approval_status = "Rejected";
							data.result[0].app.ac.approval_class = "danger";
							data.result[0].app.ac.rejection_reason = data.result[0].app.rejection_reason
						}
					}
					
					if(data.result[0].app.sa){
						if(data.result[0].app.sa.approval_status == 0){
							data.result[0].app.sa.approval_status = "Pending";
							data.result[0].app.sa.approval_class = "warning";
						}else if(data.result[0].app.sa.approval_status == 1){
							data.result[0].app.sa.approval_status = "Approved";
							data.result[0].app.sa.approval_class = "success";
							this.ifApproval = false;
						}else if(data.result[0].app.sa.approval_status == -1){
							this.ifApproval = false;
							data.result[0].app.sa.approval_status = "Rejected";
							data.result[0].app.sa.approval_class = "danger";
							data.result[0].app.sa.rejection_reason = data.result[0].app.rejection_reason
						}
					}
				}
				
				data.result[0].purchase_date = moment(data.result[0].purchase_date).format("DD MMM YYYY");
				
				this.prodrecData = data.result[0];
				this.approvalDetails = data.result[0].app;
				
				if(data.result[0].app.tlh){
					this.tlhApproval = data.result[0].app.tlh;
				}
				
				if(data.result[0].app.ac){
					this.acApproval = data.result[0].app.ac;
				}
				
				if(data.result[0].app.sa){
					this.saApproval = data.result[0].app.sa;
				}
				console.log(this.saApproval);
			},
			err=>{
				this.prodrecData="";
			},
			()=>{

			}
		);
  	}
	
	approveReceipt(id,status){
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
			var obj = { "approval_status": status ,"rejection_reason":this.reason, "approved_by":userDetails.id };
			this.busy = this.prodApp.addEditProdReceiptApproval(obj,id).subscribe(
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

	confirm(id,status) {
		console.log(id,status);
		this.confirmationService.confirm({
			message: 'Are you sure that you want to Approve?',
			header: 'Approve Receipt',
			accept: () => {			
				this.approveReceipt(id,status);
			}
		});
	}
	
	reject(id,status) {
		console.log(id,status);
		this.confirmationService.confirm({
			message: 'Are you sure that you want to Reject?',
			header: 'Reject Receipt',
			accept: () => {
				if(status == -1){
					this.rejectNow();
				}else{
					this.approveReceipt(id,status);
				}
			}
		});
	}
	
}
