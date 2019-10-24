import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cement_bag_removals_tblApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation

declare var hostname:any;

@Component({
  templateUrl: 'view-cement-bag-removal.component.html'
})
export class ViewCementBagRemovalComponent {
	public id: number;
	busy:any;
	bagremoval:any=[];
	attach_picture_array:any=[];
	
	constructor(private cementApi:Cement_bag_removals_tblApi,private route: ActivatedRoute) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });

		this.id = this.route.snapshot.params['id'];
	}
  
	ngOnInit(): void {
		this.busy = this.cementApi.getCementBagRemoval(this.id).subscribe(
			data=>{
				if(data.result[0].to_date!=""){
					data.result[0].to_date = moment(data.result[0].to_date).format("DD MMM YYYY");
				}
				if(data.result[0].from_date!=""){
					data.result[0].from_date = moment(data.result[0].from_date).format("DD MMM YYYY");
				}
				// Photos
				if(data.result[0].attach_picture){
					this.attach_picture_array = JSON.parse(data.result[0].attach_picture);
					data.result[0].attach_picture_array = this.attach_picture_array;
				}
				if (data.result[0].digital_sign) {
					var digital = JSON.parse(data.result[0].digital_sign)[0];
					data.result[0].digital_sign = hostname+"/api/container/"+digital.container+"/download/"+digital.name;
				}
				this.bagremoval = data.result[0];
			},
			err=>{},
			()=>{}
		);
	}
}