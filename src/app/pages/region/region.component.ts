import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import {PaginatorModule} from 'primeng/primeng';
import { RegionApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'region.component.html'
})
export class RegionComponent {
	busy:any;
	@ViewChild('name') name: NgModel;
	display:boolean = false;
	submitted:boolean=false;
	region:any;
	offset:Number = 0;
	total:Number=0;
	paginationVal:boolean=true;
	perPageLimit:any=10;
	
	constructor(private regionApi:RegionApi, private router: Router) {}
    
	showDialog() { 
      this.display = true;
  	}
    
	hideDialog() {
		this.display = false;
	}

	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};  
		this.router.navigate(["edit-region"], navigationExtras);
	}

	ngOnInit(): void {
		this.getCount(this.perPageLimit,0);
	}

	paginate(event) {
		this.offset = event.page;
		console.log("this.offset",this.offset);
		this.getCount(10,this.offset);
	}


	getCount(limit,offset){
		this.busy = this.regionApi.getRegionCount(null,0,null,null).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				console.log("total",this.total);
				if(this.total <= 10){
					this.paginationVal = false;
				}else{
					this.paginationVal = true;
				}
			},
			err=>{},
			()=>{}
		)

		this.getData(limit,offset);
	}

	getData(limit,offset){
		this.busy = this.regionApi.getRegion(limit,offset,null,null).subscribe(
			data=>{
				this.region = data.result;
			},
			err=>{},
			()=>{}
		)
	}
}