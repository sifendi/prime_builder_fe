import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_stageApi,LoopBackAuth }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-project-stage.component.html'
})
export class AddProjectStageComponent {
	@ViewChild('project_stage') project_stage: NgModel;
	display:boolean = false;
	submitted:boolean = false;
	proStageData:any;
	result:any;
	projStg:any;
	busy:any;
	userDetails:any;
    rolename:any;
	constructor(private proStApi:Project_stageApi, private loopAuth:LoopBackAuth,private router:Router){
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	
	submit() {
		this.submitted=true;  
		var user_id = this.userDetails.userDet.id;
		if(this.project_stage.valid){
			let para={project_stage: this.project_stage.value, status:1,created_by:user_id, updated_by:user_id};
			this.busy = this.proStApi.addEditStage(para).subscribe((Res)=>{
				this.result = "success";
				this.display = true;
				this.submitted=false; 
				setTimeout(()=>{
					this.router.navigate(["/project-stage"]);
				})
			},(userErr)=>{
				this.result = "failed";
				this.display = true;
			});
		}
	}
}