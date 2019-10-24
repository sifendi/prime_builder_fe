import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { App_rds_visitApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation

@Component({
  templateUrl: 'view-rds_visit.component.html'
})
export class ViewRdsVisitComponent {
	busy:any;
	public id: number;
	rdsVisitData:any=[];
	rdsUnique:any = [];
	constructor(private rdsVisit:App_rds_visitApi,private route: ActivatedRoute) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });
		this.id = this.route.snapshot.params['id'];
	}
  
	ngOnInit(): void {
		this.busy = this.rdsVisit.getRdsVisit(this.id).subscribe(
			data=>{
				if(data.result[0].visit_date!=""){
					data.result[0].visit_date = moment(data.result[0].visit_date).format("DD MMM YYYY");
				}
				if(data.result){
					this.rdsUnique = data.result[0];
				}
			},
			err=>{},
			()=>{}
		);
		
		this.busy = this.rdsVisit.getRdsVisitStock(this.id).subscribe(
			data=>{
				this.rdsVisitData = data.result;
			},
			err=>{},
			()=>{}
		);
	}
}