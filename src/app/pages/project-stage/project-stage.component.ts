import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_stageApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'project-stage.component.html'
})
export class ProjectStageComponent {
	busy:any;
	@ViewChild('project_stage') project_stage: NgModel;
	display:boolean = false;
	submitted:boolean = false;
	proStageData:any;
	offset:Number = 0;
	total:Number=0;
	paginationVal:any=true;
	ifEmpty:boolean=false;
	pagePerLimit:Number = 10;
	constructor(private proStApi:Project_stageApi,private router: Router) {}
	
	showDialog() { 
		this.display = true;
	}

	edit(id){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
			}
		};
		this.router.navigate(["edit-project-stage"], navigationExtras);
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
		this.busy = this.proStApi.getProjectstageCount().subscribe(
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
		this.busy = this.proStApi.getProjectstage(limit,page).subscribe(
			data=>{
				if(data){
					this.proStageData = data.result;
				}
			},
			err=>{},
			()=>{}
		)
	}
}