import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_product_requestApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment';

@Component({
  templateUrl: 'view-product_request.component.html'
})
export class ViewProductRequestComponent{
	busy:any;
	public id: number;
	req:any = [];
	brand:any = [];
	
	constructor(private ProdRec:App_product_requestApi,private route: ActivatedRoute) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });
		this.id = this.route.snapshot.params['id'];
	}
  
	ngOnInit(): void {
		this.busy = this.ProdRec.getProductRequest(this.id).subscribe(
			data=>{
				console.log(data);
				data.result[0].request_date = moment(data.result[0].request_date).format("DD MMM YYYY");
				if(data.result[0].product_request_status=="1"){
					data.result[0].product_request_status = "Approved";
					data.result[0].product_request_class = "success";
				}else if(data.result[0].product_request_status=="-1"){
					data.result[0].product_request_status = "Rejected";
					data.result[0].product_request_class = "danger";
				}else if(data.result[0].product_request_status=="0"){
					data.result[0].product_request_status = "Pending";
					data.result[0].product_request_class = "warning";
				}
				var brandCaptured = data.result[0].brand_captured;
				if(data.result[0].brand_captured.length == 0){
					data.result[0].brand_captured = [];
				}
				
				for(var i=0; i<brandCaptured.length; i++){
					if(data.result[0].brand_captured[i]['status']=="1"){
						data.result[0].brand_captured[i]['status'] = "Approved";
					}else if(data.result[0].brand_captured[i]['status']=="-1"){
						data.result[0].brand_captured[i]['status'] = "Rejected";
					}else if(data.result[0].brand_captured[i]['status']=="0"){
						data.result[0].brand_captured[i]['status'] = "Pending";
					}
				}
				console.log(data.result[0].brand_captured);
				if(data.result[0].hpb_digital_sign){
					data.result[0].hpb_digital_sign = JSON.parse(data.result[0].hpb_digital_sign)[0].serverPath;
				}else{
					data.result[0].hpb_digital_sign = '';
				}
				this.req = data.result[0];
				this.brand = data.result[0].brand_captured;
			},
			err=>{
				this.req="";
			},
			()=>{

			}
		);
  	}
}
