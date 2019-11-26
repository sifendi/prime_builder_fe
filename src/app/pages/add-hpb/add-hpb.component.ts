import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { SubdistrictApi,MunicipalityApi,App_hpbApi,Postal_codeApi,Project_stageApi,Project_typeApi,NmcApi,ProvinceApi,DistrictApi } from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'add-hpb.component.html'
})
export class AddHpbComponent {
  @ViewChild('hpbName') hpbName: any={};
  @ViewChild('type') type: any={};  
  @ViewChild('pMobile') pMobile: any={};
  @ViewChild('sMobile') sMobile: any={};
  @ViewChild('email') email: any={};  
  @ViewChild('pOBrth') pOBrth: any={};
  @ViewChild('dOBrth') dOBrth: any={};
  @ViewChild('idCrdNo') idCrdNo: any={};
  @ViewChild('idCrdAdd') idCrdAdd: any={};
  @ViewChild('idCrdPrvnc') idCrdPrvnc: any={};
  @ViewChild('idCrdDistr') idCrdDistr: any={};
  @ViewChild('idCrdcty') idCrdcty: any={};
  @ViewChild('idCrdSbDst') idCrdSbDst: any={};
  @ViewChild('idCrdPcd') idCrdPcd: any={};  
  @ViewChild('issmdom') issmdom: any={};
  @ViewChild('dmclAdd') dmclAdd: any={};
  @ViewChild('dmclCrdPrvnc') dmclCrdPrvnc: any={};
  @ViewChild('dmclCrdDistr') dmclCrdDistr: any={};
  @ViewChild('dmclcty') dmclcty: any={};
  @ViewChild('dmclSbDst') dmclSbDst: any={};
  @ViewChild('dmclPcd') dmclPcd: any={};  
  @ViewChild('cmpnyName') cmpnyName: any={};
  @ViewChild('cmpnyRName') cmpnyRName: any={};
  @ViewChild('dsgntn') dsgntn: any={};
  @ViewChild('status') status: any={};
  @ViewChild('assignTo') assignTo: any={};
  @ViewChild('comments') comments: any={};
  //@ViewChild('longitude') longitude: any={};
  //@ViewChild('latitude') latitude: any={};
  display:boolean=false;result:any;
  submitted:boolean=false;provData:any;dData:any;mData:any;subDist:any;
  hpbData:any;pCdData:any;typeData:any;stgData:any;nmcData:any;
  dmDData:any;dmCityData:any;dmSdData:any;dmPcdData:any;
  //default inputs variables
  ftype:any;
  hpbname:any;                                  
  hpbtype:any;
  hpbpMobile:any;
  hpbsMobile:any;
  hpbemail:any;
  hpbpOBrth: any;
  hpbdOBrth:any;
  hpbidCrdNo:any;
  hpbidCrdAdd:any;
  hpbidCrdPrvnc:any;
  hpbidCrdDistr:any;
  hpbidCrdcty:any;
  hpbidCrdSbDst:any;
  hpbidCrdPcd:any;
  hpbissmdom:any;
  hpbdmclAdd:any;
  hpbdmclCrdPrvnc:any;
  hpbdmclCrdDist:any;
  hpbdmclcty:any;
  hpbdmclSbDst:any;
  hpbdmclPcd:any;
  hpbcmpnyName:any;
  hpbcmpnyRName:any;
  hpbdsgntn:any;
  hpbstatus:any;
  hpbassignTo:any;
  hpbcomments:any;
  //hpblongitude:any;
  //hpblatitude:any;
  constructor(private subDistApi:SubdistrictApi,private mApi:MunicipalityApi,private dApi:DistrictApi,private provApi:ProvinceApi,private hpbApi:App_hpbApi,private pcApi:Postal_codeApi,private proStApi:Project_stageApi,public proApi:Project_typeApi,private nmc:NmcApi) {
    
  }
  getdistrict(toWhich){
    //console.log(this.idCrdPrvnc.value);
    if(toWhich=="id"){
        var nowId = this.idCrdPrvnc.value;
        this.hpbidCrdcty="";
        this.hpbidCrdSbDst = "";
        this.hpbidCrdPcd = "";
        this.dData = [];
    }else{
        var nowId = this.dmclCrdPrvnc.value;
        this.hpbdmclcty="";
        this.hpbdmclSbDst = "";
        this.hpbdmclPcd = "";
        this.dmDData = [];
    }
    let para= {};
    para={province_id:this.idCrdPrvnc.value};
    this.dApi.getDistrict().subscribe(
      data=>{
        if( data['result'] && data['result'].length > 0 ) {
          for( let i=0; i<data['result'].length; i++ ) {
            if( nowId == data['result'][i]['province'] ) {
              if(toWhich=="id"){
                this.dData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
              }else{
                this.dmDData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
              }
            }
          }
        }
      },
      err=>{
      },
      ()=>
      {}
    )
    //console.log("final"+this.dmclCrdPrvnc.value);
  }
  getCity(toWhich){
    //console.log(this.idCrdDistr.value);
    //console.log("1"+this.dmclCrdPrvnc.value);
    if(toWhich=="id"){
        var nowId = this.idCrdDistr.value;
        this.hpbidCrdcty="";
        this.hpbidCrdSbDst = "";
        this.hpbidCrdPcd = "";
        this.mData = [];
    }else{
        var nowId = this.dmclCrdDistr.value;
        this.hpbdmclcty="";
        this.hpbdmclSbDst = "";
        this.hpbdmclPcd = "";
        this.dmCityData = [];
    }
    let para= {};
    para={province_id:this.idCrdDistr.value};
    this.mApi.getMunicipality().subscribe(
      data=>{
        if( data['result'] && data['result'].length > 0 ) {
          for( let i=0; i<data['result'].length; i++ ) {
            //if( nowId == data['result'][i]['district_name'] ) {
              if(toWhich=="id"){
                this.mData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
              }else{
                this.dmCityData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
              }
            //}
          }
          //console.log( this.mData);
        }
      },
      err=>{
      },
      ()=>
      {}
    )
  }
  getSubDist(toWhich){
    //console.log("CITY"+this.idCrdcty.value+""+this.hpbidCrdcty);
    if(toWhich=="id"){
        var nowId = this.idCrdcty.value;
        this.hpbidCrdSbDst = "";
        this.hpbidCrdPcd = "";
        this.subDist = [];
    }else{
        var nowId = this.dmclcty.value;
        this.hpbdmclSbDst = "";
        this.hpbdmclPcd = "";
        this.dmSdData = [];
    }
    let para= {};
    para={province_id:this.idCrdcty.value};
    this.subDistApi.getSubDistrict().subscribe(
      data=>{
        if( data['result'] && data['result'].length > 0 ) {
          for( let i=0; i<data['result'].length; i++ ) {
            if( nowId == data['result'][i]['municipality'] ) {
              if(toWhich=="id"){
                this.subDist.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
              }else{
                this.dmSdData.push({ 'id': data['result'][i]['id'], 'name': data['result'][i]['name'] });
              }
            }
          }
          //console.log( this.subDist);          
        }
      },
      err=>{
      },
      ()=>
      {}
    )
  }
  getPinCode(toWhich){
    //console.log("CITY"+this.idCrdSbDst.value+""+this.hpbidCrdSbDst);
    if(toWhich=="id"){
        var nowId = this.idCrdSbDst.value;
      this.pCdData = [];
    }else{
      var nowId = this.dmclSbDst.value;
      this.dmPcdData = [];
    }
    let para= {};
    para={province_id:this.idCrdSbDst.value};
    this.pcApi.getPostalCode().subscribe(
      data=>{
        //console.log(data);
        if( data['result'] && data['result'].length > 0 ) {
            for( let i=0; i<data['result'].length; i++ ) {
              if( nowId == data['result'][i]['name'] ) {
                if(toWhich=="id"){
                  this.pCdData.push({ 'id': data['result'][i]['id'], 'postal_code': data['result'][i]['postal_code'] });
                }else{
                  this.dmPcdData.push({ 'id': data['result'][i]['id'], 'postal_code': data['result'][i]['postal_code'] });                  
                }
              }
            }
        }
      },
      err=>{
      },
      ()=>
      {}
    ) 
  }
  submit() { 
    this.submitted=true; 
    console.log("sub");
    console.log(this.issmdom.value);
    if(this.issmdom.value==1){
      this.dmclAdd={};
      this.dmclCrdPrvnc={};
      this.dmclcty={};
      this.dmclSbDst={};
      this.dmclPcd={};
      this.dmclAdd.value=this.idCrdAdd.value;
      this.dmclCrdPrvnc.value=this.idCrdPrvnc.value;
      this.dmclcty.value=this.idCrdcty.value;
      this.dmclSbDst.value=this.idCrdSbDst.value;
      this.dmclPcd.value=this.idCrdPcd.value;
    }
    console.log(this.dOBrth.value);
		var dt=new Date(this.dOBrth.value).getTime(); 
  	if(this.hpbName.valid&&this.type.valid&&this.pMobile.valid){
      if(this.type.value==1){
        this.ftype="Contractor";
      }else{
        this.ftype="Mason"
      }
      console.log("hbsfsd");
			let para= {};
      para={
			hpb_name: this.hpbName.value,
      hpb_type: this.type.value,
      hpb_profile_pic: "jhjkn",
      primary_mobile_no: this.pMobile.value,
      secondary_mobile_no: this.sMobile.value,
      hpb_email: this.email.value,
      place_of_birth: this.pOBrth.value,
      date_of_birth: dt,
      id_card_number: this.idCrdNo.value,
      id_photo: "uhj",
      id_card_address: this.idCrdAdd.value,
      id_card_province: this.idCrdPrvnc.value,
      id_card_city: this.idCrdcty.value,
      id_card_sub_district: this.idCrdSbDst.value,
      id_card_pincode: this.idCrdPcd.value,
      domicile_same_as_id_card: this.issmdom.value,
      domicile_address: this.dmclAdd.value,
      domicile_province: this.dmclCrdPrvnc.value,
      domicile_city: this.dmclcty.value,
      domicile_sub_district: this.dmclSbDst.value,
      domicile_pincode: this.dmclPcd.value,
      company_name: this.cmpnyName.value,
      company_representative_name: this.cmpnyRName.value,
      company_designation: this.dsgntn.value,
      hpb_status: this.status.value,
      hpb_digital_sign: "blah",
      additional_comments: this.comments.value,
      //longitude: this.longitude.value,
      //latitude: this.latitude.value,
      assigned_to: "1",
      created_date: "12",
      created_by: "123",
      updated_date: "12",
      updated_by: "56"
      }
			this.hpbApi.addEditHpb(para,"").subscribe((Res)=>{
			  console.log('Res',Res);
        this.result = "success";
        this.display=true;
			},(userErr)=>{
			  console.log('UserError',userErr);
        this.result = userErr.message;    
        this.display=true;
			});
		}
  }
  ngOnInit(): void {
    
    // this.pcApi.find().subscribe(
    //   data=>{
    //     this.pCdData = data;
        
    //   },
    //   err=>{

    //   },
    //   ()=>{

    //   }
    // )
    // this.proStApi.find().subscribe(
    //    data=>{
    //      if(data){
    //       this.stgData = data;
    //      }
          
    //    },
    //    err=>{

    //    },
    //    ()=>{

    //    }
    // )
    // this.proApi.find().subscribe(
    //    data=>{
    //      if(data){
    //       this.typeData = data;
    //      }
          
    //    },
    //    err=>{

    //    },
    //    ()=>{

    //    }
    // )
    // this.nmc.find().subscribe(
    //    data=>{
    //       this.nmcData = data;
    //    },
    //    err=>{

    //    },
    //    ()=>{

    //    }
    // )
    this.provApi.getProvince().subscribe(
      data=>{
        console.log(data);
        this.provData = data.result;
      },
      err=>{

      },
      ()=>{

      }
    )
  }
}
