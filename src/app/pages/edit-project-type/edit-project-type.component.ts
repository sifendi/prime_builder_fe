import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_typeApi,LoopBackAuth }   from '../../../shared/loopback_sdk';

@Component({
	templateUrl: 'edit-project-type.component.html'
})
export class EditProjectTypeComponent {
	@ViewChild('project_type') project_type: NgModel;
	public id: number;
	display:boolean = false;
	submitted:boolean = false;
	projects:any;projtypeData:any;
	result:any;type:any;
	loading:boolean = false;
	userDetails:any;
    rolename:any;
	constructor(private proApi:Project_typeApi,private router: ActivatedRoute, private loopAuth:LoopBackAuth) {
		// this.router.queryParams.subscribe(params => {
			// this.id = params["id"];
		// });
		this.id = this.router.snapshot.params['id'];
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	
	submit() {
		this.submitted=true;  
		var user_id = this.userDetails.userDet.id;
		if(this.project_type.valid){
			let para={project_type: this.project_type.value,created_by:user_id, updated_by:user_id}
			this.loading = true;
			this.proApi.addEditProjecttype(para,this.id).subscribe((Res)=>{
				this.result = "success";
				this.display = true;
				this.submitted = true;
				this.loading = false; 
			},(userErr)=>{
				this.result = "failed";    
				this.display=true;
				this.loading = false;
			});
		}
	}
	
	ngOnInit(): void {
		this.proApi.findById(this.id).subscribe(
			data=>{
				console.log(data);;
				this.projtypeData = data;
				this.type = this.projtypeData.project_type;
			},
			err=>{},
			()=>{}
		)
	}
}
