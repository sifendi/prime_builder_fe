import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackAuth,NmcApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-nmc.component.html'
})

export class AddNmcComponent {
	@ViewChild('nmc_type') nmc_type: NgModel;
	display:boolean = false;
	submitted:boolean = false;
	result:any;
	nmctype:any;
	
	busy:any;
	
	userDetails:any;
	rolename:any;
	
	constructor(private nmc:NmcApi, private loopAuth:LoopBackAuth, private router:Router) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	
	submit() {
		this.submitted=true;  
		if(this.nmc_type.valid){
			var user_id = this.userDetails.userDet.id;
			let para={nmc_type: this.nmc_type.value, status:1, created_by:user_id, updated_by:user_id };
			this.busy = this.nmc.addEditNmc(para).subscribe((Res)=>{
				this.result = "success";
				this.display = true;
				setTimeout(()=>{
					  this.router.navigate(['/nmc']);
				},3000);
			},(userErr)=>{
				this.result = "failed";
				this.display = true;
			});
		}
	}
}
