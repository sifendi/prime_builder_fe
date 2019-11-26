import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackAuth,NmcApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'edit-nmc.component.html'
})
export class EditNmcComponent {
	
	@ViewChild('nmc_type') nmc_type: NgModel;
	public id: number;
	result:any;
	display:boolean = false;
	submitted:boolean = false;
	nmcData:any;
	type:any;
	updatedDate:any;
	
	userDetails:any;
	rolename:any;
	loading:boolean = false;
	
	constructor(private nmc:NmcApi,private router: ActivatedRoute, private loopAuth:LoopBackAuth) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		// this.router.queryParams.subscribe(params => {
			// this.id = params["id"];
		// });
		this.id = this.router.snapshot.params['id'];
	}
	
	submit() {
		this.submitted=true;  
		//this.updatedDate = Math.floor(new Date());
		if(this.nmc_type.valid){
			this.loading = true;
			var user_id = this.userDetails.userDet.id;
			let para={nmc_type: this.nmc_type.value, status:1, created_by:user_id, updated_by:user_id };
			this.nmc.addEditNmc(para,this.id).subscribe((Res)=>{
				this.result = "success";
				this.display = true;
				this.loading = false;
			},(userErr)=>{
				this.result = "failed"; 
				this.display = true;
				this.loading = false;
			});
		}
	}

	ngOnInit(): void {
    this.nmc.findById(this.id).subscribe(
      data=>{
        console.log(data);
        this.nmcData = data;
        this.type = this.nmcData.nmc_type;
      },
      err=>{

      },
      ()=>{

      }
    )
  }
}