import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_typeApi,LoopBackAuth }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-project-type.component.html'
})
export class AddProjectTypeComponent {
	@ViewChild('project_type') project_type: NgModel;
	display:boolean = false;
	submitted:boolean = false;
	loading:boolean=false;
	projects:any;
	result:any;
	projecttype:any;
	busy:any;
	userDetails:any;
    rolename:any;
	constructor(private  proApi:Project_typeApi, private loopAuth:LoopBackAuth,private router:Router) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}

	submit() {
		this.submitted=true;  
		var user_id = this.userDetails.userDet.id;
		if(this.project_type.valid){
			let para={project_type: this.project_type.value, status:1,created_by:user_id, updated_by:user_id};
			this.busy = this.proApi.addEditProjecttype(para).subscribe((Res)=>{
				this.result = "success";
				this.display=true;
				this.submitted=false;
				setTimeout(()=>{
					this.router.navigate(["/project-type"]);
				},3000)
			},(userErr)=>{
				this.result = "failed";
				this.display = true;
			});
		}
	}
}