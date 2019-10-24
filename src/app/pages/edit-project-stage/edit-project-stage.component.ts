import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_stageApi, LoopBackAuth}   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'edit-project-stage.component.html'
})
export class EditProjectStageComponent {
  @ViewChild('project_stage') project_stage: NgModel;
  public id: number;
  display:boolean = false;
  result:any;
	submitted:boolean = false;
  proStageData:any;
  stage:any;

  loading:boolean = false;
	userDetails:any;
  rolename:any;
  constructor(private proStApi:Project_stageApi,private router: ActivatedRoute, private loopAuth:LoopBackAuth) {
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
    console.log('project_stage is ',this.project_stage.value);
    if(this.project_stage.valid){
      console.log('this is valid'); 
      let para= {};
    para={project_stage: this.project_stage.value,created_by:user_id, updated_by:user_id}
    this.loading = true;
    this.proStApi.addEditStage(para,this.id).subscribe((Res)=>{
        console.log('Res',Res);
        this.result = "success";
        this.display = true;
        this.submitted=false;
        this.loading = false; 
      },(userErr)=>{
        console.log('UserError',userErr);
        this.result = "failed"; 
        this.display = true;
        this.loading = false;
      });
    }
  }
  ngOnInit(): void {
    this.proStApi.findById(this.id).subscribe(
      data=>{
        if(data){
          console.log(data);
          this.proStageData = data;
          this.stage = this.proStageData.project_stage;
        } 
      },
      err=>{

      },
      ()=>{

      }
    )
  }
}
