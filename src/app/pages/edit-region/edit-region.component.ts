import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { RegionApi }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'edit-region.component.html'
})
export class EditRegionComponent {
	@ViewChild('name') name: NgModel;
	@ViewChild('code') code: NgModel;
	public id: number;
	display:boolean = false;
	submitted:boolean = false;
	regionname:any;
	regionfrmcode:any;
	result:any;
	
	loading:boolean = false;
	defCode:any;
	defname:any;
	namechkRes:boolean= true;
	namechkResErr:boolean= false;
	nameChange:any;
	busy:any;
	constructor(private regionApi:RegionApi,private router: ActivatedRoute) {
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
		
		if(this.regionname){
			this.regionname = this.regionname.trim();
		}
		
		if(this.name.valid && this.code.valid&&this.namechkRes == true&&(this.regionname.match(/^[a-zA-Z0-9 ]+$/) && (this.regionname!=''))){
			let para={name: this.name.value, region_code:this.code.value, status:1};
			this.loading = true;
			this.regionApi.addEditRegion(para,this.id).subscribe((Res)=>{
				this.result = "success";
				this.submitted=false;  
				this.display=true;
				this.loading = false;
			},(userErr)=>{
				this.result = "failed";    
				this.submitted=false;  
				this.display=true;
				this.loading = false;
			});
		}
	}
	
	ngOnInit(): void {
		this.busy = this.regionApi.findById(this.id).subscribe(
			data=>{
				this.regionname= data['name'];
				this.regionfrmcode = data['region_code'];
				this.defname = data['name'];
				this.defCode = data['region_code'];
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
		}else{
			this.regionfrmcode = this.defCode;
		}
	}
}
