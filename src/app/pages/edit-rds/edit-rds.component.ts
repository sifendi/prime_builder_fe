import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_rdsApi,Postal_codeApi,DistrictApi,MunicipalityApi,SubdistrictApi,ProvinceApi,LoopBackAuth }   from '../../../shared/loopback_sdk';
import async from 'async';
@Component({
  templateUrl: 'edit-rds.component.html'
})
export class EditRdsComponent {
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
  rdsgndr:any;
  rdstype:any;
  rdsaddrss:any;
  rdsSts:any;
  public id: number;
  display:boolean=false;result:any;
  submitted:boolean=false;
  subDistFldArray:any=[];
  subdistcounter:number = 0 ;
  subDistErrDisplay:boolean=false;
  addSubDistErr:any;
  subdistrictArray:any = [[],[]];
  user_id:any;
  rolename:any;
  removedsubDist:any=[];
  defaultSubDistCount:any;
  holcimIdErrDisplay:boolean=false;
  loading:boolean = false;
	userDetails:any;
  rolename2:any;
  pCdData:any;dData:any=[];mData:any=[];subDist:any=[];provData:any=[];rdsData:any;
  constructor(private rdsApi:App_rdsApi,private pcApi:Postal_codeApi,private dApi:DistrictApi
              ,private mApi:MunicipalityApi,private subDistApi:SubdistrictApi,private provApi:ProvinceApi
              ,private route: Router,private router: ActivatedRoute,private loopAuth:LoopBackAuth) {
    // this.router.queryParams.subscribe(params => {
        // this.id = params["id"];
	//});
	this.id = this.router.snapshot.params['id'];
    this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename2 = this.userDetails.userDet.roles[0].name;
  }
      
  getdistrict(isIni,i){
    //console.log("provId",this.subDistFldArray[i].rdsprvnc);
    this.dData = [];
    this.mData = [];
    this.subDist = [];   
    this.subDistFldArray[i].allDistr = []; 
    this.subDistFldArray[i].allcty = [];
    this.subDistFldArray[i].allSbDst = [];
    if(isIni!=true){
      this.subDistFldArray[i].rdsDistr = "";
      this.subDistFldArray[i].rdscty = "";
      this.subDistFldArray[i].rdsSbDst = "";
    }
    this.dApi.getDistrict("","","",this.subDistFldArray[i].rdsprvnc).subscribe(
      data=>{
        if( data['result'] && data['result'].length > 0 ) {
          for( let i=0; i<data['result'].length; i++ ) {
            this.dData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
          }
          this.subDistFldArray[i].allDistr=this.dData;
        }
      },
      err=>{
      },
      ()=>
      {}
    )
  }

  getCity(isIni,i){
    //console.log("cityId",this.subDistFldArray[i].rdsDistr);
    this.mData = [];
    this.subDist = [];   
    this.subDistFldArray[i].allcty = [];
    this.subDistFldArray[i].allSbDst = []; 
    if(isIni!=true){
      this.subDistFldArray[i].rdscty = "";
      this.subDistFldArray[i].rdsSbDst = ""; 
    }
    this.mApi.getMunicipality(this.subDistFldArray[i].rdsDistr).subscribe(
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

  getSubDist(isIni,i){
    //console.log("sdId",this.subDistFldArray[i].rdscty);
    this.subDist = [];
    this.subDistFldArray[i].allSbDst = [];
    if(isIni!=true){
      this.subDistFldArray[i].rdsSbDst = ""; 
    }
    this.subDistApi.getSubDistrict("","",this.subDistFldArray[i].rdscty).subscribe(
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

  AddsubDistFld(){
    this.subDistErrDisplay = false ;
    //console.log("add",this.subdistcounter);
    //console.log("array",this.subDistFldArray);
    var pos = "";
    for(var i=0;i<this.subDistFldArray.length;i++){
      if(this.subDistFldArray[i]['rdsSbDst']==null||this.subDistFldArray[i]['rdsSbDst']==""){
        pos = pos+" "+(i+1);
        this.addSubDistErr = "Please enter a valid entry above then add new.("+pos+" )";
        this.subDistErrDisplay = true ;
      }
      //pos = pos.slice( 1 );
    }
    if(this.subDistErrDisplay==false){
      this.subDistFldArray.push({rdsprvnc: "", rdsDistr: "", rdscty: "", rdsSbDst:"",
                                allprvnc:this.provData,allDistr:null,allcty:null,allSbDst:null,mapping_id:null
      });
      this.subdistcounter++;                          
    }else{
      this.subDistErrDisplay = true ;
    }                        
  }

  removesubDistFld(i){
    //console.log(this.subdistcounter);
    if(this.subDistFldArray[i].mapping_id!=null){
      this.removedsubDist.push(this.subDistFldArray[i]);
    }
    //console.log(this.removedsubDist);
    this.subDistFldArray.splice(i,1);
    if(i==0&&this.subdistcounter==0){  
      this.subDistFldArray.push({rdsprvnc: "", rdsDistr: "", rdscty: "", rdsSbDst:"",
                                 allprvnc:this.provData,allDistr:null,allcty:null,allSbDst:null,mapping_id:null
      });
    }else{
      this.subdistcounter--;  
    }
  }

  submit() {
    this.submitted=true;
    this.subDistErrDisplay = false ; 
    this.holcimIdErrDisplay = false ;   
    this.subdistrictArray=[];

    for(var i=0;i<this.subDistFldArray.length;i++){
      this.subdistrictArray.push({'mapping_id': this.subDistFldArray[i].mapping_id,'sdid': this.subDistFldArray[i].rdsSbDst, 'status': 1});
    }
    var pos = "";
    for(var i=0;i<this.subdistrictArray.length;i++){
      if(this.subdistrictArray[i]['sdid']==null||this.subdistrictArray[i]['sdid']==""){
        pos = pos+" "+(i+1);
        this.addSubDistErr = "Please enter a valid entry above then submit.("+pos+" )";
        this.subDistErrDisplay = true ;
      }
    }
    for(var i=0;i<this.removedsubDist.length;i++){
      this.subdistrictArray.push({'mapping_id': this.removedsubDist[i].mapping_id,'sdid': this.removedsubDist[i].rdsSbDst, 'status': 0});
    }
    //console.log(this.subdistrictArray,this.removedsubDist);
    if(this.holcimId.valid&&this.name.valid&&this.pMobile.valid&&this.sMobile.valid&&
       this.gndr.valid&&this.type.valid&&this.addrss.valid&&this.rdsStatus.valid&&this.subDistErrDisplay!=true){
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
      this.loading = true;
      console.log(this.subdistrictArray);
      //hilcim Id check
      this.rdsApi.getRdsOnHolcimId(this.holcimId.value).subscribe(
        data=>{
          if((data['result'].length==1&&data['result'][0].id==this.id)||(data['result'].length==0)){
            this.rdsApi.addEditRds(para,this.id).subscribe((Res)=>{
              var rds_id = Res.result.id;
              this.rdsApi.insertEditRdsSubDistrict(rds_id,this.subdistrictArray).subscribe((Res)=>{
                console.log('Res',Res);
                this.result = "success";
                this.display=true;
                this.loading = false;
              },(userErr)=>{
                console.log('UserError',userErr);
                this.result = "failed";    
                this.display=true;
                this.loading = false;
              });
            },(userErr)=>{
              console.log('UserError',userErr);
              this.result = "failed";    
              this.display=true;
              this.loading = false;
            })
          }else{
            this.holcimIdErrDisplay =true;
            this.loading = false;
          }
        },
        err=>{},	
        ()=>{}
      )
    }
  }

  goToListing(){
    this.route.navigate(["/rds"]);
  }

  ngOnInit(): void {
    this.provApi.getProvince().subscribe(
      data=>{
        this.provData = data.result;
      },
      err=>{
      },
      ()=>{
      }
    )
    let userDetails = this.loopAuth.getCurrentUserData();
		let rolename;
		if(userDetails.userDet!==""){
		 rolename = userDetails.userDet.roles[0].name;
		}
		var user_id;
		if(rolename == "$ra"){
			this.user_id = userDetails.userDet.id;
		}else{
			this.rolename = "";
		}
    this.rdsApi.getRds(this.id,"","","",this.user_id,this.rolename).subscribe(
      data=>{
        this.rdsData = data.result[0];
        this.rdsholcimId=this.rdsData.holcim_id;
        this.rdsname=this.rdsData.rds_name;
        this.rdspMobile=this.rdsData.rds_mobile;
        this.rdssMobile=this.rdsData.rds_phone;
        this.rdsemail=this.rdsData.rds_email;
        this.rdsgndr=this.rdsData.rds_gender;
        this.rdstype=this.rdsData.rds_type;
        this.rdsaddrss=this.rdsData.rds_address; 
        this.rdsSts=this.rdsData.rds_status;
        // for(var i=0;i<this.rdsData.subdistrict.length;i++){
        //   this.subDistFldArray.push({rdsprvnc: this.rdsData.province[i].id, rdsDistr: this.rdsData.district[i].id, rdscty: this.rdsData.municipality[i].id, rdsSbDst:this.rdsData.subdistrict[i].id,
        //                        allprvnc:this.provData,allDistr:null,allcty:null,allSbDst:null,mapping_id:this.rdsData.subdistrict[i].mapping_id
        //   });
        //   if(i>0){
        //     this.subdistcounter++;
        //   }
        //   this.getdistrict(true,i); 
        //   this.getCity(true,i);        
        //   this.getSubDist(true,i);          
        // }
        // this.defaultSubDistCount=this.subdistcounter;
        // console.log(this.subDistFldArray);
      },
      err=>{

      },
      ()=>{

      }
    )
    this.rdsApi.getRdsSubDistData(this.id).subscribe(
      data=>{
        var maindata = data.result;
        //console.log("maindata",maindata);
        var i = 0;
        async.each(maindata,(item,callback)=>{ 
          if(i>0){
            this.subdistcounter++;
          }
          this.rdsApi.getRdsSubDistData2(item.province_id,item.dist_id,item.mun_id).subscribe(
          datalist=>{  
            //console.log("datalist",datalist,i);
            // this.subDistFldArray.push({rdsprvnc: this.rdsData.province[i].id, rdsDistr: this.rdsData.district[i].id, rdscty: this.rdsData.municipality[i].id, rdsSbDst:this.rdsData.subdistrict[i].id,
            //                    allprvnc:this.provData,allDistr:data.result[0].district,allcty:data.result[0].municipality,allSbDst:data.result[0].subdistrict,mapping_id:this.rdsData.subdistrict[i].mapping_id
            // });
            this.subDistFldArray.push({
              rdsprvnc:item.province_id,
              rdsDistr: item.dist_id,
              rdscty: item.mun_id,
              rdsSbDst:item.subdist_id,
              allprvnc:this.provData,
              allDistr:datalist.result.district,
              allcty:datalist.result.municipality,
              allSbDst:datalist.result.subdistrict,
              mapping_id:item.mapping_id
            });
            i++;
            callback(true);
          },
          err=>{
            i++;      
            callback(true);      
          },
          ()=>{         
          }
          )          
        });
        this.defaultSubDistCount=this.subdistcounter;
        console.log(this.subDistFldArray);
      },
      err=>{
      },
      ()=>{

      }
    )
  }

  chkSubDist(i){
    this.subDistErrDisplay = false ;
    for(var j=0;j<this.subDistFldArray.length;j++){
      //console.log(this.subDistFldArray[j]['rdsSbDst'],this.subDistFldArray[i]['rdsSbDst']);
      if(this.subDistFldArray[j]['rdsSbDst']==this.subDistFldArray[i]['rdsSbDst']&&i!=j){
        this.addSubDistErr = "Can not add same sub district";
        this.subDistErrDisplay = true ;
        this.subDistFldArray[i].rdsSbDst = "";
        var allsubdist = this.subDistFldArray[i].allSbDst;
        this.subDistFldArray[i].allSbDst = allsubdist;
      }
    }
  }
}
