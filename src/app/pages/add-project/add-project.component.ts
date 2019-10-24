import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_typeApi,Project_stageApi,Postal_codeApi,NmcApi,App_projectsApi,App_hpbApi} from '../../../shared/loopback_sdk'

@Component({
  templateUrl: 'add-project.component.html'
})
export class AddProjectComponent {
  @ViewChild('hpbid') hpbid: any={};
  @ViewChild('project') project: any={};
  @ViewChild('completionDate') completionDate: any={};
  @ViewChild('quantityEstimation') quantityEstimation: any={};
  @ViewChild('typeId') typeId: any={};  
  @ViewChild('stageid') stageid: any={};
  @ViewChild('address') address: any={};
  @ViewChild('province') province: any={};
  @ViewChild('municipality') municipality: any={};
  @ViewChild('subDistrict') subDistrict: any={};
  @ViewChild('pCdId') pCdId: any={};
  @ViewChild('isSrku') isSrku: any={};
  @ViewChild('srkuOwnerName') srkuOwnerName: any={};  
  @ViewChild('srkuOwnerAdd') srkuOwnerAdd: any={};
  @ViewChild('srkuOwnerMob') srkuOwnerMob: any={};
  @ViewChild('srkuProvince') srkuProvince: any={};
  @ViewChild('srkuMncplty') srkuMncplty: any={};
  @ViewChild('srkuSbDst') srkuSbDst: any={};
  @ViewChild('srkupCdId') srkupCdId: any={};  
  @ViewChild('frlSize') frlSize: any={};
  @ViewChild('hmNoUnit') hmNoUnit: any={};
  @ViewChild('isMcrCrd') isMcrCrd: any={};
  @ViewChild('bankNm') bankNm: any={};
  @ViewChild('nmcTypeId') nmcTypeId: any={};
  @ViewChild('comments') comments: any={};
  @ViewChild('longitude') longitude: any={};
  @ViewChild('latitude') latitude: any={};
  typeData:any;stgData:any;pCdData:any;nmcData:any;submitted:any;hpbData:any;
  constructor(private projApi:App_projectsApi,private hpbApi:App_hpbApi,private projTypeApi:Project_typeApi,private proStApi:Project_stageApi,private pcApi:Postal_codeApi,private nmc:NmcApi) {
  }
  submit() { 
  	this.submitted=true;
    console.log(this.isSrku.value);
    if(this.isSrku.value==0){
      this.srkuOwnerName={};
      this.srkuOwnerAdd={};
      this.srkuOwnerMob={};
      this.srkuProvince={};
      this.srkuMncplty={};
      this.srkupCdId={};
      this.srkuSbDst={};
      this.srkuOwnerName.value="";
      this.srkuOwnerAdd.value="";
      this.srkuOwnerMob.value="";
      this.srkuProvince.value="";
      this.srkuSbDst.value="";
      this.srkuMncplty.value="";
      this.srkupCdId.value="";
    }
    if(this.isMcrCrd.value==0){
      this.bankNm={};
      this.bankNm.value="";
    }
    //console.log(this.srkuOwnerName.value+""+
      //this.srkuOwnerAdd.value+""+this.srkuOwnerMob.value+""+this.srkuProvince.value+""+this.srkuSbDst.value+""+this.srkuMncplty.value+""+this.srkupCdId.value);
		if(this.hpbid.valid&&this.project.valid){
			console.log('this is valid'); 
      var cmpltndt=new Date(this.completionDate.value).getTime(); 
	  let para = {};
	  // this.hpbid.value,
	  // this.project.value,
	  // cmpltndt,
	  // this.quantityEstimation.value,
	  // this.typeId.value,
	  // this.stageid.value,
	  // "gd",
	  // this.address.value,
	  // this.province.value,
	  // this.municipality.value,
	  // this.subDistrict.value,
	  // this.pCdId.value,
	  // this.isSrku.value,
	  // this.srkuOwnerName.value,
	  // this.srkuOwnerAdd.value,
	  // this.srkuOwnerMob.value,
	  // this.srkuProvince.value,
	  // this.srkuMncplty.value,
	  // this.srkuSbDst.value,
	  // this.srkupCdId.value,
	  // this.frlSize.value,
	  // this.hmNoUnit.value,
	  // this.isMcrCrd.value,
	  // this.bankNm.value,
	  // "wdsd",
	  // this.nmcTypeId.value,
	  // "ydfgdf",
	  // this.comments.value,"ddd",
	  // this.longitude.value,
	  // this.latitude.value,
	  // "12",
	  // "1223","12","123","12","56"
	  
			this.projApi.addEditProject(para).subscribe((Res)=>{
			  console.log('Res',Res);alert("success");
			},(userErr)=>{
			  console.log('UserError',userErr);alert(userErr.massage);
			});
		}
  }
  ngOnInit(): void {
    this.projTypeApi.find().subscribe(
      data=>{
        this.typeData = data;

      },
      err=>{

      },
      ()=>{

      }
    )
    this.proStApi.find().subscribe(
      data=>{
        this.stgData = data;
        
      },
      err=>{

      },
      ()=>{

      }
    )
    this.pcApi.find().subscribe(
      data=>{
        this.pCdData = data;
        
      },
      err=>{

      },
      ()=>{

      }
    )
    this.nmc.find().subscribe(
       data=>{
          this.nmcData = data;
          console.log(data);
       },
       err=>{

       },
       ()=>{

       }
    )
    this.hpbApi.find().subscribe(
      data=>{
        console.log(data);
        this.hpbData = data;
      },
      err=>{

      },
      ()=>{
        
      }
    )
  }
}
