import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_rdsApi } from '../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "viewRds",
	templateUrl: 'view-rds.component.html'
})
export class ViewRdsComponent {
	
	public id: number;
	hpbData: any = [];

	constructor(private rdsApi:App_rdsApi, private route: ActivatedRoute) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });

		this.id = this.route.snapshot.params['id'];
	}

	ngOnInit(): void {
		this.rdsApi.getRds(this.id).subscribe(
			data => {
				console.log(data.result);
				this.hpbData = data.result[0];
				var subDistrict = this.hpbData.subdistrict;
				var municipality = this.hpbData.municipality;
				var district = this.hpbData.district;
				var province = this.hpbData.province;
				this.hpbData.subdistrict = "";
				this.hpbData.municipality = "";
				this.hpbData.province='';
				this.hpbData.district='';
				var subDistrictList = "";
				var municipalityList = "";
				var districtList = "";
				var provList = "";
				for(var j=0; j<subDistrict.length; j++){
					if(j+1 == subDistrict.length){
						subDistrictList+=subDistrict[j]['name'];
						this.hpbData['subdistrictName'] = subDistrictList;
					}else{
						subDistrictList+=subDistrict[j]['name']+",";
					}
				}
				for(var j=0; j<municipality.length; j++){
					if(j+1 == municipality.length){
						municipalityList+=municipality[j]['name'];
						this.hpbData['municipalityName'] = municipalityList;
					}else{
						municipalityList+=municipality[j]['name']+",";
					}
				}
				for(var j=0; j<district.length; j++){
					if(j+1 == district.length){
						districtList+=district[j]['name'];
						this.hpbData['districtName'] = districtList;
					}else{
						districtList+=district[j]['name']+",";
					}
				}
				for(var j=0; j<province.length; j++){
					if(j+1 == province.length){
						provList+=province[j]['name'];
						this.hpbData['provinceName'] = provList;
					}else{
						provList+=province[j]['name']+",";
					}
				}
			},
			err => { },
			() => { }
		)
	}
}
