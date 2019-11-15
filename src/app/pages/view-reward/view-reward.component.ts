import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { DydApi, RewardApi, Reward_promosApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation
import { ALL_CONSTANTS } from '../../../providers/constants';

declare var hostname:any;

@Component({
  templateUrl: 'view-reward.component.html'
})
export class ViewRewardComponent {
	public id: number;
	products: any = [];
	rewardData:any = {};
	project_photo_array: any = []; bank_document_array: any = []; nmc_document_array:any = [];
	constructor(private route: ActivatedRoute,private reward:RewardApi,private promo:Reward_promosApi) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });
		this.id = this.route.snapshot.params["id"];
	}

	ngOnInit(): void {
		this.reward.getRewardsDashboard("","","","","","","","","","",this.id).subscribe(
			data=>{
				this.rewardData = data.result[0];
				let promos = this.rewardData.promo.length;
				this.rewardData.image = hostname+"/api/container/reward/download/"+this.rewardData.image;
				for(var i=0; i<promos; i++){
					data.result[0].promo[i]['start_date'] = moment(data.result[0].promo[i]['start_date']).format("DD.MM.YYYY");
					data.result[0].promo[i]['end_date'] = moment(data.result[0].promo[i]['end_date']).format("DD.MM.YYYY");;
				}
			},
			err=>{
				
			},
			()=>{
				
			}
		);
    }
}
