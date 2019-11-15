import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ProvinceApi }   from '../../../shared/loopback_sdk';
import { LoopBackAuth,RegionApi }   from '../../../shared/loopback_sdk';
@Component({
  templateUrl: 'add-province.component.html'
})
export class AddProvinceComponent {
	@ViewChild('name') name: NgModel;
	@ViewChild('region') region: NgModel;
	@ViewChild('code') code: NgModel;
	display:boolean = false;
	submitted:boolean=false;
	regiond:any;
	provincename:any;
	provincecode:any;
	provinceregion:any;
	result:any;
	busy:any;
	
	userDetails:any;
	rolename:any;

	namechkRes:boolean= false;
	namechkResErr:boolean= false;
	nameChange:any;
	constructor(private proApi:ProvinceApi, private regionApi:RegionApi, private loopAuth:LoopBackAuth, private router:Router) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}

	submit() {
		this.submitted=true; 
		this.namechkResErr = false;
		if(this.namechkRes == false&&this.name.valid){
			this.namechkResErr = true;
		} 
		
		if(this.provincename){
			this.provincename = this.provincename.trim();
		}
		
		if(this.name.valid && this.region.valid && this.code.valid&&this.namechkRes == true&&(this.provincename.match(/^[a-zA-Z0-9 ]+$/) && (this.provincename!=''))){
			var user_id = this.userDetails.userDet.id;
			let para={name: this.name.value,region_id:this.region.value, province_code:this.code.value, status:1, created_by:user_id, updated_by:user_id };
			this.busy = this.proApi.addEditProvince(para).subscribe((Res)=>{
				this.result = "success";
				this.display=true;
				this.submitted=false;
				setTimeout(()=>{
					this.router.navigate(["/province"]);
				},3000)
			},(userErr)=>{
				this.result = "failed";
				this.display=true;
				this.submitted=false;
			});
		}
	}
	
	ngOnInit(): void {
		this.regionApi.find().subscribe(
		data=>{
			this.regiond = data;
		},
		err=>{},
		()=>{}
		)
	}
	NameChange(name){
		name = name.trim();
		if(name.match(/^[a-zA-Z0-9 ]+$/) && (name!='')){
			this.namechkRes = false;
			
			this.provincecode = null;
			if(this.nameChange){
				this.nameChange.unsubscribe();
			}
				
			this.busy = this.nameChange = this.proApi.provinceNamechek(name).subscribe((Res)=>{
				if(Res.result!=''){
					this.provincecode = name+'-'+( ( parseInt(Res.result[0].code.split('-')[1]) )+1 );
				}else{
					this.provincecode = name+'-'+1;
				}
				this.namechkRes = true;
				this.namechkResErr = false;
			},(userErr)=>{
				this.namechkRes = true;
			});
		}else{
			setTimeout(()=>{
				  this.provincecode = null;
			},10);
			this.namechkRes = true;
		}
	}
}
