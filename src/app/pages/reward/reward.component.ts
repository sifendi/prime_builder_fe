import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { RewardApi }   from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import { Lightbox, IAlbum, LightboxConfig } from 'angular2-lightbox';

declare var hostname:any;

@Component({
  templateUrl: 'reward.component.html'
})
export class RewardComponent {
	busy:any;
  	Name:any;
  	rewardData:any;
  	offset:any = 0;
  	ifEmpty:boolean=false;
  	total:Number=0;
  	paginationVal:any=true;
  	_albums:any = [];
	perPageLimit = 10;
	  
	nameSearch: any;
  	constructor(private reward:RewardApi, private router: Router, private _lightbox: Lightbox) {}
	editReward(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
			"id": id,
			}
		};
		this.router.navigate(["edit-reward"], navigationExtras);
	}
	// view(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 		"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-reward"], navigationExtras);
	// }
    ngAfterViewInit(): void {
		this.getCount(10,"","");
	}
	paginate(event) {
		this.offset=event.page;
		this.getData(10,this.offset,this.nameSearch);
	}
	searchData(){
		if(this.Name){
			this.paginationVal = false;
			this.offset = 0;
			this.ifEmpty = false;
			this.rewardData = [];
			this.nameSearch = this.Name;
			this.getCount(10,0,this.nameSearch);
		}
	}
	getCount(limit,offset,name){
		this.busy = this.reward.getRewards("",name).subscribe(
			data=>{
				this.total = data['result'].length;
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
				this.rewardData = [];
				this.getData(limit,offset,name);
			},
			err=>{},	
			()=>{}
		)
	}
	getData(limit,offset,name){
		this.busy = this.reward.getRewards("",name,"","","","","","",limit,offset).subscribe(
			data=>{
				this._albums = [];
				var dataLength = data.result.length;
				if(dataLength == 0){
					this.ifEmpty = true;
				}
				for(var i=0; i<dataLength; i++){
					var imageName = data.result[i].image;
					data.result[i].image = hostname+"/api/container/reward/download/"+imageName;
					this._albums.push(
						{
							src:data.result[i].image,
							thumb: data.result[i].image
						}
					);
					if(data.result[i]['start_date']!=""){
						if(data.result[i]['start_date']){
							data.result[i]['start_date'] = moment(data.result[i]['start_date']).format("DD MMM YYYY");
						}
						if(data.result[i]['end_date']){
							data.result[i]['end_date'] = moment(data.result[i]['end_date']).format("DD MMM YYYY");
						}
					}
					
					if(data.result[i]['status'] == 0){
						data.result[i]['status'] = "Inactive";
					}else if(data.result[i]['status'] == 1){
						data.result[i]['status'] = "Active";
					}
				}
				this.rewardData = data.result;	
			},
			err=>{},
			()=>{}
		)
	}
	resetData(){
		this.ifEmpty = false;
		this.paginationVal=false;
		this.Name = "";
		this.offset=0;
		this.nameSearch = "";
		//var pageEvent = {page: 0, first: 0, rows: "10", pageCount: 6};
		//this.paginate(pageEvent);
		this.getCount(10,this.offset,"");
	}
	
	open(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums, index);
	}
}
