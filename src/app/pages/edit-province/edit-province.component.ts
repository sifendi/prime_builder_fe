import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ProvinceApi }   from '../../../shared/loopback_sdk';
import { LoopBackAuth,RegionApi }   from '../../../shared/loopback_sdk';
@Component({
	templateUrl: 'edit-province.component.html'
})
export class EditProvinceComponent {
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
	proData:any;
	public id: number;
	loading:boolean = false;
	
	userDetails:any;
	rolename:any;

	defCode:any;
	defname:any;
	namechkRes:boolean= true;
	namechkResErr:boolean= false;
	nameChange:any;
	busy:any;
	constructor(private proApi:ProvinceApi, private regionApi:RegionApi,private router: ActivatedRoute, private loopAuth:LoopBackAuth) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		
		// this.router.queryParams.subscribe(params => {
			// this.id = params["id"];
		// });
		this.id = this.router.snapshot.params['id'];
	}
	
	submit() {
		this.submitted=true;  
		this.namechkResErr = false;
		if(this.namechkRes == false && this.name.valid){
			this.namechkResErr = true;
		}
		
		if(this.provincename){
			this.provincename = this.provincename.trim();
		}
		
		if(this.name.valid && this.code.valid&&this.namechkRes == true&&(this.provincename.match(/^[a-zA-Z0-9 ]+$/) && (this.provincename!=''))){
			let para={name: this.name.value,region_id:this.region.value, province_code:this.code.value, status:1, created_by:user_id, updated_by:user_id };
			this.loading= true;
			var user_id = this.userDetails.userDet.id;
			this.proApi.addEditProvince(para,this.id).subscribe((Res)=>{
				this.result = "success";
				this.display=true;
				this.submitted=false; 
				this.loading= false;	
			},(userErr)=>{
				this.result = "failed";
				this.display=true;
				this.loading= false;	
			});
		}
	}
	ngOnInit(): void {
		this.busy = this.proApi.findById(this.id).subscribe(
			data=>{
				this.proData = data;
				this.provincename=data['name'];
				this.provincecode=data['province_code'];
				this.provinceregion=data['region_id'];
				this.defCode=data['name'];
				this.defname=data['province_code'];
			},
			err=>{},
			()=>{}
		)
		
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
		if(name!=this.defname){
			if(name.match(/^[a-zA-Z0-9 ]+$/) && (name!='')){
				this.namechkRes = false;
				this.provincecode = null;
				
				if(this.nameChange){
					this.nameChange.unsubscribe();
				}
				
				this.busy = this.proApi.provinceNamechek(name).subscribe((Res)=>{
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
		}else{
			this.provincecode = this.defCode;
		}
	}
}