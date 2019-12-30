import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_hpbApi, Postal_codeApi,User_mapApi } from '../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment'; //for date manupalation
import { Lightbox, IAlbum, LightboxConfig } from 'angular2-lightbox';
import {ConfirmationService} from 'primeng/primeng';
import {Message,MenuItem,SelectItem} from 'primeng/primeng';

declare var hostname:any;

@Component({
	selector: "viewHpb",
	templateUrl: 'view-hpb.component.html',
	providers: [ConfirmationService],
	styles: [`
		.disabledDiv {
			pointer-events: none;
		}
	`]
})
export class ViewHpbComponent {
	public id: number;
	hpbData: any = []; pCdData: any;
	hpbPoints: any;
	msgs: Message[] = [];
	msgsG: Message[] = [];
	compDtl:any="Hide";
	id_card_image_array: any = []; //array to stor images of id card
	busy:any;
	constructor(private hpbApi: App_hpbApi, private pcApi: Postal_codeApi,public userMapApi:User_mapApi, private route: ActivatedRoute, private _lightbox: Lightbox,private confirmationService: ConfirmationService) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });
		this.id = this.route.snapshot.params['id'];
	}

	ngAfterViewInit(): void {
		this.busy = this.hpbApi.getHpbPoints(this.id).subscribe(
			data => {
				console.log(data.result);
				this.hpbPoints = data.result;
			},
			err => { },
			() => { }
		)
		this.busy = this.hpbApi.getHpb(this.id).subscribe(
			data => {
				if (data.result[0].domicile_same_as_id_card == 1) {
					if (!data.result[0].domicile_address) {
						data.result[0].domicile_address = data.result[0].id_card_address;
					}
					if (!data.result[0].domicile_city) {
						data.result[0].domicile_city = data.result[0].id_card_city;
					}
					if (!data.result[0].domicile_pincode) {
						data.result[0].domicile_pincode = data.result[0].id_card_pincode;
					}
					if (!data.result[0].domicile_province) {
						data.result[0].domicile_province = data.result[0].id_card_province;
					}
				}
				if (data.result[0].date_of_birth) {
					data.result[0].date_of_birth = moment(data.result[0].date_of_birth).format("DD MMM YYYY");
				}
				if (data.result[0].prospect_switching_dt) {
					data.result[0].prospect_switching_dt = moment(data.result[0].prospect_switching_dt).format("DD MMM YYYY");
				}
				if (data.result[0].switching_maintain_dt) {
					data.result[0].switching_maintain_dt = moment(data.result[0].switching_maintain_dt).format("DD MMM YYYY");
				}
				
				//signature image processing
				if (data.result[0].hpb_digital_sign) {
					var digital = JSON.parse(data.result[0].hpb_digital_sign)[0];
					data.result[0].hpb_digital_sign = hostname+"/api/container/"+digital.container+"/download/"+digital.name;
				}
				
				//profile pic processing
				if(data.result[0].hpb_profile_pic){
					var hpb_profile_pic = JSON.parse(data.result[0].hpb_profile_pic)[0];
					data.result[0].hpb_profile_pic = hostname+"/api/container/"+hpb_profile_pic.container+"/download/"+hpb_profile_pic.name;
				}else{
					data.result[0].hpb_profile_pic = "../../../dashboard/assets/img/photo.jpg";
				}
				
				data.result[0].profileArr = [{ src:data.result[0].hpb_profile_pic, thumb: data.result[0].hpb_profile_pic}];
				
				//id card image processing
				if(data.result[0].id_photo){
					
					this.id_card_image_array = JSON.parse(data.result[0].id_photo);
					data.result[0].cardArr = [];
					for(var j=0; j<(this.id_card_image_array).length; j++){
						
						var imagename = this.id_card_image_array[j];
						this.id_card_image_array[j] = hostname+"/api/container/"+imagename.container+"/download/"+imagename.name;
						
						data.result[0].cardArr.push({ src:this.id_card_image_array[j], thumb: this.id_card_image_array[j] });
						
						if(j+1 == this.id_card_image_array.length){
							data.result[0].id_card_image_array = this.id_card_image_array;
						}
						
					}
				}
				
				this.hpbData = data.result[0];
				if(this.hpbData.company_name){
					//this.compDtl="Show";
				}
				console.log(data.result[0].hpb_digital_sign);
			},
			err => { },
			() => { }
		)
	}
	open(data,index: number): void {
		// override the default config
		this._lightbox.open(data, index, { wrapAround: true, showImageNumberLabel: true });
	}
	
	activeInactiveClick(){
		//alert('activeInactiveClick');
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'fa fa-question-circle',
			accept: () => {
			  // this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
			  this.activeInactiveSubmit();
			},
			reject: () => {
			 // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
		});
	}

	activeInactiveSubmit(){
		let dataObj={};
		if(this.hpbData['status']==1){
			dataObj['status']=0;
		}else{
			dataObj['status']=1;
		}
		let uid=this.id;
		this.msgs.length=0;
		this.busy = this.hpbApi.addEditHpb(dataObj,uid).subscribe((respData:any)=>{
			console.log('respData',respData);
			if(respData['result']['updated_date']){
				this.msgs.push({severity:'success', summary:'Success Message', detail:'HPB Status Submited Successfully.'});
				
				setTimeout(()=>{
					window.location.reload();
				},1000);

			}else{
				this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
			}
		},(error)=>{
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
		});
	}

	resetHistoryClick(){
		//alert('resetHistoryClick');
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			header: 'Confirmation',
			icon: 'fa fa-question-circle',
			accept: () => {
			    //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
				this.resetUserSubmit();
			},
			reject: () => {
				// this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
			}
		});
	}

	resetUserSubmit(){
		let dataObj={};
		
		dataObj['reset']="1";
		//dataObj['status']="0";
		let uid=this.id;
		this.msgs.length=0;
		this.busy = this.userMapApi.userResetHistory(dataObj,uid).subscribe((respData:any)=>{
			//console.log('respData',respData);
			if(respData['result']['status']){
				this.msgs.push({severity:'success', summary:'Success Message', detail:'User History Reset Successfully.'});
			}else{
				this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
			}
		},(error)=>{
			//console.log('respData error',error);
			this.msgs.push({severity:'warn', summary:'Error Message', detail:'Somthing Went Wrong. Please try again later.'});
		});
	}



}