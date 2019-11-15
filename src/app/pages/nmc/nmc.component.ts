import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NmcApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'nmc.component.html'
})

export class NmcComponent {
	busy:any;
	nmcData:any;
	offset:Number = 0;
	total:Number=0;
	paginationVal:any=true;
	ifEmpty:boolean=false;
	perpageLimit:Number = 10;

	constructor(private nmc:NmcApi,private router: Router) {}

	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};
		this.router.navigate(["edit-nmc"], navigationExtras);
	}

	ngAfterViewInit(): void {
		this.getCount(this.perpageLimit, 0);
	}

	paginate(event){
		this.offset=event.page;
		this.getData(this.perpageLimit,this.offset);
		this.paginationVal=true;
	}

	getCount(limit,page){
		this.busy = this.nmc.getNmcCount().subscribe(
			data=>{
				if(data){
					this.total = data['result'][0]['total'];
					if(this.total <= 10){
						this.paginationVal = false;
					}else{
						this.paginationVal = true;
					}
				}
				this.getData(limit,page);
			},
			err=>{},
			()=>{}
		)
	}

	getData(limit,page){
		this.busy = this.nmc.getNmc(limit,page).subscribe(
			data=>{
				if(data){
					this.nmcData = data.result;
				}
			},
			err=>{},
			()=>{}
		)
	}
}
