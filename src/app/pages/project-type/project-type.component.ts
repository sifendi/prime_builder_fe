import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_typeApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'project-type.component.html'
})
export class ProjectTypeComponent {
	@ViewChild('project_type') project_type: NgModel;
	proTypeData:any;
	display:boolean = false;
	submitted:boolean = false;
	busy:any;
	offset:Number = 0;
	total:Number=0;
	paginationVal:any=true;
	ifEmpty:boolean=false;
	pagePerLimit:Number = 10;
	
	constructor(public proApi:Project_typeApi,private router: Router) {}
	
	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};
		this.router.navigate(["edit-project-type"], navigationExtras);
	}
	
	showDialog() { 
		this.display = true;
	}
	
	ngAfterViewInit(): void {
		this.getCount(this.pagePerLimit, 0);
	}

	paginate(event){
		this.offset=event.page;
		this.getData(this.pagePerLimit,this.offset);
		this.paginationVal=true;
	}

	getCount(limit,page){
		this.busy = this.proApi.getProjecttypeCount().subscribe(
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
		this.busy = this.proApi.getProjecttype(limit,page).subscribe(
			data=>{
				if(data){
					this.proTypeData = data.result;
				}
			},
			err=>{},
			()=>{}
		)
	}
}