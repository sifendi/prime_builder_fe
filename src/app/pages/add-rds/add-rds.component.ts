import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_rdsApi,Postal_codeApi,DistrictApi,MunicipalityApi,SubdistrictApi,ProvinceApi,LoopBackAuth }   from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-rds.component.html'
})
export class AddRdsComponent {
	@ViewChild('holcimId') holcimId: any={};
	@ViewChild('name') name: any={};
	@ViewChild('pMobile') pMobile: any={};
	@ViewChild('sMobile') sMobile: any={};
	@ViewChild('type') type: any={};
	@ViewChild('gndr') gndr: any={};
	@ViewChild('email') email: any={};  
	@ViewChild('addrss') addrss: any={}; 
	@ViewChild('rdsStatus') rdsStatus: any={}; 
	rdsholcimId:any;
	rdsname:any;
	rdspMobile:any;
	rdssMobile:any;
	rdsemail:any;
	rdsgndr:any="";
	rdstype:any="";
	rdsaddrss:any;
	rdsSts:any="";
	display:boolean=false;
	result:any;
	submitted:boolean=false;
	pCdData:any;
	dData:any;
	mData:any;
	subDist:any;
	provData:any;
	subDistFldArray:any = [];
	subdistcounter:number = 0 ;
	subDistErrDisplay:boolean=false;
	addSubDistErr:any;
	subdistrictArray:any=[[],[]];
	holcimIdErrDisplay:boolean=false;
	busy:any;
	userDetails:any;
	rolename:any;
	constructor(private rdsApi:App_rdsApi,private pcApi:Postal_codeApi,private dApi:DistrictApi,private mApi:MunicipalityApi,private subDistApi:SubdistrictApi,private provApi:ProvinceApi, private loopAuth:LoopBackAuth,private router:Router) {
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
	}
	ngOnInit(): void {
		this.subDistFldArray.push({rdsprvnc: "", rdsDistr: "", rdscty: "", rdsSbDst:"",allprvnc:null,allDistr:null,allcty:null,allSbDst:null});	
		this.provApi.getProvince().subscribe(
			data=>{
				this.provData = data.result;
				this.subDistFldArray[0].allprvnc=this.provData;
			},
			err=>{

			},
			()=>{

			}
		)
	}
	getdistrict(i){
		this.dData = [];
		this.mData = [];
		this.subDist = [];   
		this.subDistFldArray[i].allDistr = []; 
		this.subDistFldArray[i].allcty = [];
		this.subDistFldArray[i].allSbDst = [];
		this.subDistFldArray[i].rdsDistr = "";
		this.subDistFldArray[i].rdscty = "";
		this.subDistFldArray[i].rdsSbDst = "";
		this.busy = this.dApi.getDistrict("","","",this.subDistFldArray[i].rdsprvnc).subscribe(
		  data=>{
			if( data['result'] && data['result'].length > 0 ) {
			  for( let i=0; i<data['result'].length; i++ ) {
				  this.dData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
			  }
			}
			this.subDistFldArray[i].allDistr=this.dData;
		  },
		  err=>{
		  },
		  ()=>
		  {}
		)
	}


	getCity(i){
		this.mData = [];
		this.subDist = [];   
		this.subDistFldArray[i].allcty = [];
		this.subDistFldArray[i].allSbDst = []; 
		this.subDistFldArray[i].rdscty = "";
		this.subDistFldArray[i].rdsSbDst = ""; 
		this.busy = this.mApi.getMunicipality(this.subDistFldArray[i].rdsDistr).subscribe(
		  data=>{
			if( data['result'] && data['result'].length > 0 ) {
			  for( let i=0; i<data['result'].length; i++ ) {
			   this.mData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
			  }
			  this.subDistFldArray[i].allcty=this.mData;
			}
		  },
		  err=>{
		  },
		  ()=>
		  {}
		)
	}


	getSubDist(i){
		this.subDist = [];
		this.subDistFldArray[i].allSbDst = [];
		this.subDistFldArray[i].rdsSbDst = "";    
		this.busy = this.subDistApi.getSubDistrict("","",this.subDistFldArray[i].rdscty).subscribe(
		  data=>{
			if( data['result'] && data['result'].length > 0 ) {
			  for( let i=0; i<data['result'].length; i++ ) {
			   this.subDist.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
			  }     
			  this.subDistFldArray[i].allSbDst  = this.subDist; 
			}
		  },
		  err=>{
		  },
		  ()=>
		  {}
		)
	}
	chkSubDist(i){
    this.subDistErrDisplay = false ;
    for(var j=0;j<this.subDistFldArray.length;j++){
      if(this.subDistFldArray[j]['rdsSbDst']==this.subDistFldArray[i]['rdsSbDst']&&i!=j){
        this.addSubDistErr = "Can not add same sub district";
        this.subDistErrDisplay = true ;
        this.subDistFldArray[i].rdsSbDst = "";
        var allsubdist = this.subDistFldArray[i].allSbDst;
        this.subDistFldArray[i].allSbDst = allsubdist;
      }
    }
  }
  AddsubDistFld(){
    this.subDistErrDisplay = false ;
    var pos = "";
    for(var i=0;i<this.subDistFldArray.length;i++){
      if(this.subDistFldArray[i]['rdsSbDst']==null||this.subDistFldArray[i]['rdsSbDst']==""){
        pos = pos+" "+(i+1);
        this.addSubDistErr = "Please enter a valid entry above then add new.("+pos+" )";
        this.subDistErrDisplay = true ;
      }
    }
    if(this.subDistErrDisplay==false){
      this.subDistFldArray.push({rdsprvnc: "", rdsDistr: "", rdscty: "", rdsSbDst:"",
                                allprvnc:this.provData,allDistr:null,allcty:null,allSbDst:null
      });
      this.subdistcounter++;                          
    }else{
      this.subDistErrDisplay = true ;
    }
  }
  removesubDistFld(i){
    this.subDistFldArray.splice(i,1);
    if(i==0&&this.subdistcounter==0){  
      this.subDistFldArray.push({rdsprvnc: "", rdsDistr: "", rdscty: "", rdsSbDst:"",
                                allprvnc:this.provData,allDistr:null,allcty:null,allSbDst:null
      });
    }else{
      this.subdistcounter--;
    }
  }
  submit() {
    this.submitted=true;
    this.subDistErrDisplay = false ;
		this.holcimIdErrDisplay =false ;
		this.rdsaddrss = this.rdsaddrss.trim();
    this.subdistrictArray=[];
    for(var i=0;i<this.subDistFldArray.length;i++){
      this.subdistrictArray.push({'sdid': this.subDistFldArray[i].rdsSbDst,'status': 1});
    }
    var pos = "";
    for(var i=0;i<this.subdistrictArray.length;i++){
      if(this.subdistrictArray[i]['sdid']==null||this.subdistrictArray[i]['sdid']==""){
        pos = pos+" "+(i+1);
        this.addSubDistErr = "Please enter a valid entry above then submit.("+pos+" )";
        this.subDistErrDisplay = true ;
      }
    }
    if(this.holcimId.valid&&this.name.valid&&this.email.valid&&this.pMobile.valid&&this.sMobile.valid&&
       this.gndr.valid&&this.type.valid&&this.addrss.valid&&this.rdsStatus.valid
       &&this.subDistErrDisplay!=true){  
      var user_id = this.userDetails.userDet.id;
      let para= {};
			para={
        holcim_id: this.holcimId.value,
        rds_name:this.name.value,
        rds_mobile:this.pMobile.value,
        rds_phone:this.sMobile.value,
        rds_email:this.email.value,
        rds_gender:this.gndr.value,
        rds_type: this.type.value,
        rds_address:this.addrss.value,
        rds_status:this.rdsStatus.value,created_by:user_id, updated_by:user_id
      }
      this.busy = this.rdsApi.getRdsOnHolcimId(this.holcimId.value).subscribe(
        data=>{
          var total = data['result'].length;
          if(total==0){
            this.rdsApi.addEditRds(para).subscribe((Res)=>{
              var rds_id = Res.result.id;
              this.rdsApi.insertEditRdsSubDistrict(rds_id,this.subdistrictArray).subscribe((Res)=>{
                  this.submitted=false;
                  this.subDistFldArray = [];
                  this.subDistFldArray.push({rdsprvnc: null, rdsDistr: null, rdscty: null, rdsSbDst:null,allprvnc:this.provData,allDistr:null,allcty:null,allSbDst:null});
                  this.subdistcounter = 0;
                  this.subdistrictArray = "";
                  this.result = "success";
                  this.display=true;
                  this.submitted=false;
                  this.subDistErrDisplay=false;
				  setTimeout(()=>{
					  this.router.navigate(["/rds"]);
				  },3000)
              },(userErr)=>{
                this.result = "failed";
                this.display=true;
              });
            },(userErr)=>{
              this.result = "failed";
              this.display=true;
            });
          }else{
            this.holcimIdErrDisplay =true;
          }
        },
        err=>{},	
        ()=>{}
      )
    }
  }
}