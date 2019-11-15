import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { LoopBackAuth, RegionApi }   from '../../../shared/loopback_sdk';

@Component({
	templateUrl: 'add-region.component.html'
})
export class AddRegionComponent {
	@ViewChild('name') name: NgModel;
	@ViewChild('code') code: NgModel;
	display:boolean = false;
	submitted:boolean = false;
	result:any;
	regionfrmname:any;
	regionfrmcode:any;  
	userDetails:any;
	rolename:any;
	
	busy:any;
	namechkRes:boolean= false;
	namechkResErr:boolean= false;
	
	nameChange:any;
	
	constructor(private regionApi:RegionApi, private loopAuth:LoopBackAuth,private router:Router){
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	submit() {
		this.submitted=true;
		this.namechkResErr = false;
		if(this.namechkRes == false && this.name.valid == true){
			this.namechkResErr = true;
		}
		
		if(this.regionfrmname){
			this.regionfrmname = this.regionfrmname.trim();
		}
		
		if(this.name.valid && this.code.valid&&this.namechkRes == true&&(this.regionfrmname.match(/^[a-zA-Z0-9 ]+$/) && (this.regionfrmname!=''))){
			var user_id = this.userDetails.userDet.id;
			let para={name: this.name.value,region_code:this.code.value, status:1,  created_by:user_id, updated_by:user_id };
			this.busy = this.regionApi.addEditRegion(para).subscribe((Res)=>{
				this.result = "success";
				this.display=true;
				setTimeout(()=>{
					  this.router.navigate(['/region']);
				},3000);
			},(userErr)=>{
				this.result = "failed";    
				this.display=true;
				this.submitted=false;
			});
		}
	}
	NameChange(name){
		name = name.trim();
		if(name.match(/^[a-zA-Z0-9 ]+$/) && (name!='')){
			this.namechkRes = false;
			this.regionfrmcode = null;
			if(this.nameChange){
				this.nameChange.unsubscribe();
			}
				
			this.nameChange = this.busy = this.regionApi.regionNamechek(name).subscribe((Res)=>{
				if(Res.result!=''){
					this.regionfrmcode = name+'-'+( ( parseInt(Res.result[0].code.split('-')[1]) )+1 );
				}else{
					this.regionfrmcode = name+'-'+1;
				}
				this.namechkRes = true;
				this.namechkResErr = false;
			},(userErr)=>{
				this.namechkRes = true;
			});
		}else{
			setTimeout(()=>{
				  this.regionfrmcode = null;
			},10);
			this.namechkRes = true;
		}
	}
}
