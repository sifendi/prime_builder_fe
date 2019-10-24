import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { SubdistrictApi,MunicipalityApi,LoopBackAuth,App_hpbApi,Postal_codeApi,Project_stageApi,Project_typeApi,NmcApi,ProvinceApi,DistrictApi, Hpb_update_approvalApi } from '../../../shared/loopback_sdk';
import {CookieService} from 'angular2-cookie/core';
import {Headers, Http, Response} from '@angular/http';
import * as moment from 'moment'; //for date manupalation
import {Message} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';
import { stringify } from '@angular/core/src/util';
declare var window:any;
declare var hostname:any;
@Component({
  templateUrl: 'Edit-hpb.component.html',
  providers: [ConfirmationService],
})
export class EditHpbComponent {
  [x: string]: any;
  @ViewChild('hpbName') hpbName: any={};
  @ViewChild('type') type: any={};
  @ViewChild('pMobile') pMobile: any={};
  @ViewChild('sMobile') sMobile: any={};
  @ViewChild('email') email: any={};
  @ViewChild('pOBrth') pOBrth: any={};
  @ViewChild('dOBrth') dOBrth: any={};
  @ViewChild('issmdom') issmdom: any={};
  @ViewChild('cmpnyName') cmpnyName: any={};
  @ViewChild('cmpnyRName') cmpnyRName: any={};
  // @ViewChild('dsgntn') dsgntn: any={};
  @ViewChild('comments') comments: any={};
  public id: number;
  display:boolean=false;
  result:any;
  success: boolean = false;
  submitted:boolean=false;provData:any;dData:any;mData:any;subDist:any;
  hpbData:any;pCdData:any;typeData:any;stgData:any;nmcData:any;
  dmDData:any;dmCityData:any;dmSdData:any;dmPcdData:any;
  id_card_image_array: any = []; //array to stor images of id card
  //default inputs variables
  hpbnameval:any;
  hpbtype:any;
  hpbpMobile:any;
  hpbsMobile:any;
  hpbemail:any;
  hpbpOBrth: any;
  hpbdOBrth:any;
  hpbidCrdNo:any;
  hpbidCrdAdd:any;
  hpbissmdom:any;
  hpbdmclAdd:any;
  hpbcmpnyName:any;
  hpbcmpnyRName:any;
  hpbdsgntn:any;
  hpbcomments:any;
  hpbstatus:any;
  hpbstatusinit:any;
  hpb_prospect_switching_dt:any;
  hpb_switching_maintain_dt:any;
  hpb_prospect_switching_dt_init:any;
  hpb_switching_maintain_dt_init:any;
  switching_dt:any=null;
  maintain_dt:any=null;
  switchingErrFlag:boolean=false;
  maintainErrFlag:boolean=false;
  switchingFlag:boolean=false;
  maintainFlag:boolean=false;

  msgs: Message[] = [];
  msgsG: Message[] = [];
  emptyMessage:String="No Result Found";
  maxDate:Date;
  validMobile:boolean=true;

  allPostalCode: any;
  filteredPostalCode: any;
  filteredSubDistrict: any;
  allSubDistrict: any;
  filteredProvince: any;
  allProvince: any;
  perPageLimit: number = 10;
  filteredCity: any;
  allCities: any;

  domPostalCodeValue: any;
  domSubDistrictValue: any;
  domCityValue: any;
  domProvinceValue: any;
  idPostalCodeValue: any;
  idSubdistrictValue: any;
  idCityValue: any;
  idProvinceValue: any;
  filteredDomPostalCode: any;
  filteredDomSubDistrict: any;
  filteredDomCity: any;
  filteredDomProvince: any;

  validFlag : boolean = true;
  userDetails:any;
  rolename:any;
  
  imgErrDisplay:boolean=false;
	loading:boolean=false;
	imgErr:any='';
	defaultImgName:any;
  defaultImg:any=[];
  imgshow:any=[];
  allData : any=[];
  myfile:any;
  data: any;
  idImage: any;
  newimageName:any="";
  newimageArray:any=[];

  profileDefaultName: any;
  profileDefaultImg: any;
  profile_image_array: any = [];
  original_prof_array : any;
  newProfileImage: any="";
  profileImage: any;
  profileshow: any;
  profileErr: any="";
  profileData: any;
  profileErrDisplay: boolean=false;

  approvalData:any=[];

  uploadedFiles: any[] = [];
  //_albums:any = [];

  constructor(private http:Http,private _cookieService:CookieService,private route: ActivatedRoute,private router : Router,private subDistApi:SubdistrictApi,private mApi:MunicipalityApi,private dApi:DistrictApi,private provApi:ProvinceApi,private hpbApi:App_hpbApi, private hpbApprovalApi:Hpb_update_approvalApi ,private pcApi:Postal_codeApi,private proStApi:Project_stageApi,public proApi:Project_typeApi,private nmc:NmcApi,private confirmationService: ConfirmationService, private loopAuth:LoopBackAuth,){
    this.id = this.route.snapshot.params['id'];
    this.userDetails = this.loopAuth.getCurrentUserData();
    this.rolename = this.userDetails.userDet.roles[0].name;
    var currDate  = new Date();
    var now = new Date();
    this.maxDate = new Date();
    // this.maxDate = new Date(now.setFullYear(now.getFullYear() -18));
    //console.log("this.maxDate",this.maxDate);
  }

  ngOnInit(): void {
    this.busy = this.hpbApi.getHpb(this.id).subscribe(
			data => {
				if (data.result[0].domicile_same_as_id_card == 1) {
					if (!data.result[0].domicile_address) {
						data.result[0].domicile_address = data.result[0].id_card_address;
					}
					if (!data.result[0].domicile_city) {
						data.result[0].domicile_city = data.result[0].id_card_city;
					}
					if (!data.result[0].domicile_pincode) {
						data.result[0].domicile_pincode = data.result[0].id_card_pincode;
					}
					if (!data.result[0].domicile_province) {
						data.result[0].domicile_province = data.result[0].id_card_province;
					}
        }

				if(data.result[0].date_of_birth) {
          data.result[0].date_of_birth = new Date(data.result[0].date_of_birth);
				}
        console.log("data==>",data.result[0]);
        this.hpbData = data.result[0];
        this.hpbnameval = this.hpbData.hpb_name;
        this.hpbtype = this.hpbData.hpb_type;
        this.hpbpMobile = this.hpbData.primary_mobile_no;
        this.hpbsMobile =  this.hpbData.secondary_mobile_no;
        this.hpbemail = this.hpbData.hpb_email;
        this.hpbpOBrth = this.hpbData.place_of_birth;
        this.hpbdOBrth = data.result[0].date_of_birth;
        //console.log(this.hpbdOBrth);
        //id details
        this.hpbidCrdNo = this.hpbData.id_card_number;
        this.hpbidCrdAdd = this.hpbData.id_card_address;
        let hpbidCrdPrvncName = this.hpbData.domicile_province;
        this.getProvince(hpbidCrdPrvncName,'id');
        let hpbidCrdctyName = this.hpbData.id_card_city;
        this.getCity(hpbidCrdctyName,'id');
        let hpbidCrdSbDstName = this.hpbData.id_card_sub_district;
        this.getSubDistrict(hpbidCrdSbDstName,'id');
        let postCode = this.hpbData.id_card_pincode;
        this.idPostalCodeValue = {"postal_code":postCode};

        //dom details
        this.hpbissmdom = this.hpbData.domicile_same_as_id_card;
        this.hpbdmclAdd = this.hpbData.domicile_address;
        let hpbdmclCrdPrvncName = this.hpbData.domicile_province;
        this.getProvince(hpbdmclCrdPrvncName,'dom');
        let hpbdmclctyName = this.hpbData.domicile_city;
        this.getCity(hpbdmclctyName,'dom');
        let hpbdmclSbDstName = this.hpbData.domicile_sub_district;
        this.getSubDistrict(hpbdmclSbDstName,'dom');
        let domPostCode = this.hpbData.domicile_pincode;
        this.domPostalCodeValue = {"postal_code":domPostCode};

        //other
        this.hpbcmpnyName = this.hpbData.company_name;
        this.hpbcmpnyRName = this.hpbData.company_representative_name;
        this.hpbdsgntn = this.hpbData.company_designation;
        this.hpbcomments = this.hpbData.additional_comments;

        this.hpbstatusinit = this.hpbData.hpb_status;
        this.hpbstatus = this.hpbData.hpb_status;
        this.hpb_prospect_switching_dt = this.hpbData.prospect_switching_dt!=null ? moment(this.hpbData.prospect_switching_dt).format('DD MMM YYYY'):null;
        this.hpb_switching_maintain_dt = this.hpbData.switching_maintain_dt!=null ? moment(this.hpbData.switching_maintain_dt).format('DD MMM YYYY'):null;
        this.hpb_prospect_switching_dt_init = this.hpb_prospect_switching_dt;
        this.hpb_switching_maintain_dt_init = this.hpb_switching_maintain_dt;
        console.log("this.hpb_prospect_switching_dt=>",this.hpb_prospect_switching_dt);
        if(this.hpbstatus=='switching' && this.hpb_prospect_switching_dt!=null){
          this.switchingFlag = true;
        }
        if(this.hpbstatus=='maintain' && this.hpb_prospect_switching_dt!=null){
          this.maintainFlag = true;
        }
        //profile photo
        // this.original_prof_array = this.hpbData.hpb_profile_pic;
        //console.log("this.original_prof_array", this.original_prof_array);
        this.profile_image_array = JSON.parse(this.hpbData.hpb_profile_pic);
        this.profileDefaultImg = hostname+"/api/container/profile/download/"+this.profile_image_array[0]['name'];
				this.profileDefaultName = this.profile_image_array[0]['name'];
        this.profileshow = hostname+"/api/container/profile/download/"+this.profile_image_array[0]['name'];

        //id Proof photo
        this.id_card_image_array = JSON.parse(this.hpbData.id_photo);
        this.defaultImg = JSON.parse(this.hpbData.id_photo);
        //console.log("this.id_card_image_array",this.id_card_image_array);
        var count = this.id_card_image_array.length;
        //this._albums = [];
        for(let i=0; i<count;i++){
          this.imgshow[i] = hostname+"/api/container/doc/download/"+this.id_card_image_array[i]['name'];
        }
			},
			err => { },
			() => { }
		)
    this.busy = this.provApi.getProvince().subscribe(
      data=>{
        this.provData = data.result;
      },
      err=>{

      },
      ()=>{

      }
    )

    var dataArr = {
      'hpb_id':this.id,
      'approval_status':'0',
      'is_closed':'0'
    }

    this.busy = this.hpbApprovalApi.getUpdateHpb(dataArr).subscribe(
			data => {
        for(var i=0;i< data.length;i++){
          if(data.result[i].field_name == 'Mobile'){
            data.result[i]['label_name'] = 'Mobile';
          }else{
            data.result[i]['label_name'] = 'Card';
          }
        }
        this.approvalData = data.result;
        console.log("Approval Data : ", this.approvalData);
    },err => { },
      () => { }
    );


  }

  goToListing(){
    this.router.navigate(['/hpb']);
  }

  statusChange(event){
    this.switchingFlag = false;
    this.maintainFlag = false;
    this.switchingErrFlag = false;
    this.maintainErrFlag = false;
    console.log("this.hpbstatusinit=>",this.hpbstatusinit);
    console.log("this.hpb_prospect_switching_dt_init=>",this.hpb_prospect_switching_dt_init);
    if(event!=this.hpbstatusinit && event=='prospect'){
      this.hpb_prospect_switching_dt = this.hpb_prospect_switching_dt_init;
      this.hpb_switching_maintain_dt = this.hpb_switching_maintain_dt_init;
      this.switchingFlag = false;
      this.maintainFlag = false;
    }else if(event!=this.hpbstatusinit && event=='switching'){
      this.hpb_prospect_switching_dt = this.hpb_prospect_switching_dt_init;
      this.hpb_switching_maintain_dt = this.hpb_switching_maintain_dt_init;
      this.switchingFlag = true;
    }else if(event!=this.hpbstatusinit && event=='maintain'){
      this.hpb_prospect_switching_dt = this.hpb_prospect_switching_dt_init;
      this.hpb_switching_maintain_dt = this.hpb_switching_maintain_dt_init;
      this.maintainFlag = true;
      if(!this.hpb_prospect_switching_dt){
        this.switchingFlag = true;
      }
    }else if(event=='maintain' && this.hpb_switching_maintain_dt!=null){
      this.maintainFlag = true;
    }else if(event=='switching' && this.hpb_prospect_switching_dt!=null){
      this.switchingFlag = true;
    }else{
      this.switchingFlag = false;
      this.maintainFlag = false;
      this.switchingErrFlag = false;
      this.maintainErrFlag = false;
    }
  }

  getProvince(name,toWhich){
		this.provApi.getProvince(null,null,null,name).subscribe(
      data=>{
        data = data.result;
        let name = data[0]['name'];
        let id = data[0]['id'];
        if(toWhich == 'id'){
          this.idProvinceValue = {"name":name,"id":id};
        }else{
          this.domProvinceValue = {"name":name,"id":id};
        }
      },
      err=>{

      },
      ()=>{

      }
    )
  }

  getCity(name,toWhich){
		this.mApi.getMunicipalityByProvince(null,null,null,name).subscribe(
      data=>{
        data = data.result;
        let name = data[0]['name'];
        let id = data[0]['id'];
        if(toWhich == 'id'){
          this.idCityValue = {"name":name,"id":id};
        }else{
          this.domCityValue = {"name":name,"id":id};
        }
      },
      err=>{

      },
      ()=>{

      }
    )
  }

  getSubDistrict(name,toWhich){
		this.subDistApi.getSubDistrict(null,null,null,name).subscribe(
      data=>{
        data = data.result;
        let name = data[0]['name'];
        let id = data[0]['id'];
        if(toWhich == 'id'){
          this.idSubdistrictValue = {"name":name,"id":id};
        }else{
          this.domSubDistrictValue = {"name":name,"id":id};
        }
      },
      err=>{

      },
      ()=>{

      }
    )
  }

  getProvinceFilter(toWhich, event){
    let query = event.query;
    if(toWhich=="id"){
      this.idCityValue = "";
      this.idSubdistrictValue = "";
      this.idPostalCodeValue = "";
      this.provApi.getProvince(this.perPageLimit,null,null,query).subscribe((dataRes)=>{
        var allProvince = dataRes['result']; 
        this.filteredProvince = this.filterAutocompleteData(query, allProvince,'name');
      });
    }else{
      this.domCityValue = "";
      this.domSubDistrictValue = "";
      this.domPostalCodeValue = "";
      this.provApi.getProvince(this.perPageLimit,null,null,query).subscribe((dataRes)=>{
        var allProvince = dataRes['result'];
        this.filteredDomProvince = this.filterAutocompleteData(query, allProvince,'name');
      });
    }
  }

  getCityFilter(toWhich,event){
    let query = event.query;
    if(toWhich=="id"){
      this.idSubdistrictValue = "";
      this.idPostalCodeValue = "";
      let nowId = this.domProvinceValue.id;
      this.mApi.getMunicipalityByProvince(nowId,this.perPageLimit,null,query).subscribe((dataRes)=>{
        var allCities = dataRes['result'];
        this.filteredCity = this.filterAutocompleteData(query, allCities,'name');
      });
    }else{
      this.domSubDistrictValue = "";
      this.domPostalCodeValue = "";
      let nowId = this.domProvinceValue.id;
      this.mApi.getMunicipalityByProvince(nowId,this.perPageLimit,null,query).subscribe((dataRes)=>{
        var allCities = dataRes['result'];
        this.filteredDomCity = this.filterAutocompleteData(query, allCities,'name');
      });
    }
  }

  getSubDistFilter(toWhich,event){
    let query = event.query;
    if(toWhich=="id"){
        this.idPostalCodeValue = "";
        let nowId = this.idCityValue.id;
        this.subDistApi.getSubDistrict(this.perPageLimit,null,nowId,query).subscribe((dataRes)=>{
          var allSubDistrict = dataRes['result'];
          this.filteredSubDistrict = this.filterAutocompleteData(query, allSubDistrict,'name');
        });
    }else{
      this.domPostalCodeValue = "";
      let nowId = this.domCityValue.id;
       this.subDistApi.getSubDistrict(this.perPageLimit,null,nowId,query).subscribe((dataRes)=>{
        var allSubDistrict = dataRes['result'];
        this.filteredDomSubDistrict = this.filterAutocompleteData(query, allSubDistrict,'name');
      });
    }
  }

  getPinCodeFilter(toWhich,event){
    let query = event.query;
    if(toWhich=="id"){
        let nowId = this.idSubdistrictValue.id;
        this.pcApi.getPostalCode(this.perPageLimit,null,null,query,null,nowId).subscribe((dataRes)=>{
         var allPostalCode = dataRes['result'];
          this.filteredPostalCode = this.filterAutocompleteData(query, allPostalCode,'postal_code');
        });
    }else{
        let nowId = this.domPostalCodeValue.id;
        this.pcApi.getPostalCode(this.perPageLimit,null,null,query,null,nowId).subscribe((dataRes)=>{
          var allPostalCode = dataRes['result'];
          this.filteredDomPostalCode = this.filterAutocompleteData(query, allPostalCode,'postal_code');
        });
    }
  }

  filterAutocompleteData(query, filterAllData: any[],keyName):any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered : any[] = [];
		for(let i = 0; i < filterAllData.length; i++) {
			let currData = filterAllData[i];
				if(query=='' || query==null){
					filtered.push(currData);
					if(i==this.perPageLimit){
						break;
					}
				}else if(currData[keyName].toString().toLowerCase().includes(query.toLowerCase())) {
					  filtered.push(currData);
				}
		} 
		return filtered;
	}

  onFileChange(file,type){
    if(type == 'profile'){
      this.profileErrDisplay = false;
      this.profileData = new FormData();
    }else{
      this.imgErrDisplay = false;
      this.data = new FormData();
    }

    var imageData2 = new FileReader();
		if(file.target.files[0]){
			var fileSize = Math.round((file.target.files[0].size)/1024);  
			var imgExt = file.target.files[0].name.split(".");
			//console.log(file.target.files[0].type);
			if(imgExt.length > 2){
        if(type == 'profile'){
          this.profileErr = "Invalid Image Format / Image name";
          this.profileErrDisplay = true;
          this.profileImage = "";
          this.profileshow = "";
          this.profileData = "";
        }else{
          this.imgErr = "Invalid Image Format / Image name";
          this.imgErrDisplay = true;
          // this.idImage = "";
          // this.imgshow = [];
          // this.data = "";
        }
			}else if( ((file.target.files[0].type)!="image/jpg") && ((file.target.files[0].type)!="image/png") && ((file.target.files[0].type)!="image/jpeg")){
				if(type == 'profile'){
          this.profileErr = "Invalid Image Format";
          this.profileErrDisplay = true;
          this.profileImage = "";
          this.profileshow = "";
          this.profileData = "";
        }else{
          this.imgErr = "Invalid Image Format";
          this.imgErrDisplay = true;
          // this.idImage = "";
          // this.imgshow = [];
          // this.data = "";
        }
			}else if(fileSize > 7000){//chk img size
				if(type == 'profile'){
          this.profileErr = "Invalid Image Size";
          this.profileErrDisplay = true;
          this.profileImage = "";
          this.profileshow = "";
          this.profileData = "";
        }else{
          this.imgErr = "Invalid Image Size";
          this.imgErrDisplay = true;
          // this.idImage = "";
          // this.imgshow = [];
          // this.data = "";
        }
			}else{
				imageData2.onload = (event:any) => {
					var img = new Image();
					img.src = event.target.result;
					if(img.width > 500 || img.height > 500){
						if(type == 'profile'){
              this.profileErr = "Invalid Image Dimension. It needs to be of max 500*500";
              this.profileErrDisplay = true;
              this.profileImage = "";
              this.profileshow = "";
              this.profileData = "";
            }else{
              this.imgErr = "Invalid Image Dimension. It needs to be of max 500*500";
              this.imgErrDisplay = true;
              // this.idImage = "";
              // this.imgshow = [];
              // this.data = "";
            }
					}else{
            if(type == 'profile'){
              this.profileshow = event.target.result;
              let targetFile = file.target.files[0];
              let fileExtension = '.' + targetFile['name'].split('.').pop();
              let filename = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
              // console.log("file.target.files[0]['name'] : ",  file.target.files[0]['name']);
              this.profileData.append("file", file.target.files[0],filename);
            }else{
              this.imgshow.push(event.target.result);
              let targetFile = file.target.files[0];
              let fileExtension = '.' + targetFile['name'].split('.').pop();
              let filename = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
              this.data.append("file", file.target.files[0],filename);
              this.allData.push(this.data);
            }
					}
				}
				imageData2.readAsDataURL(file.target.files[0]);
			}
		}
  }

  // myUploader(event) {
  //   console.log(event);
  //     for(let file of event.files) {
  //       console.log("P-file",file);
  //     }
  // }

  uploadImage(type,fdata){
		return new Promise((resolve,reject)=>{
      console.log("fdata", fdata);
			let fileUrl = hostname+"/api/container/"+type;
			let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
      this.loading = true;

			this.http.post(fileUrl + '/upload?access_token='+loginFlagToken, fdata).subscribe(res=>{
				var dataimg = res['_body'];
        dataimg = JSON.parse(dataimg);
        //console.log("dataimg",dataimg);
        if(type == 'profile'){
          this.newProfileImage = '[{"path":"","name":"'+ dataimg['result']['files']['file'][0]['name'] +'","fileType":"'+dataimg['result']['files']['file'][0]['type']+'","serverPath":"'+hostname+'/api/container/profile/download/'+dataimg['result']['files']['file'][0]['name']+'","sync_status":1,"container":"profile"}]';
        }else{
          //this.newimageArray.push('{"path":"","name":"'+ dataimg['result']['files']['file'][0]['name'] +'","fileType":"'+dataimg['result']['files']['file'][0]['type']+'","serverPath":"'+hostname+'/api/container/doc/download/'+dataimg['result']['files']['file'][0]['name']+'","sync_status":1,"container":"doc"}');
          let tempImgObj = {
            path:'',
            name:dataimg['result']['files']['file'][0]['name'],
            fileType:dataimg['result']['files']['file'][0]['type'],
            serverPath:hostname+'/api/container/doc/download/'+dataimg['result']['files']['file'][0]['name'],
            sync_status:1,
            container:"doc"
          };
          this.id_card_image_array.push(tempImgObj);
        }
        this.newimageName = JSON.stringify(this.id_card_image_array);
				resolve(true);
			},
			err=>{
        if(type == 'profile'){
          this.profileErr = "Image upload failed";
          //this.imgshow = this.defaultImg;
          this.profileErrDisplay = true;
          this.loading = false;
        }else{
          this.imgErr = "Image upload failed";
          //this.imgshow = this.defaultImg;
          this.imgErrDisplay = true;
          this.loading = false;
        }
				resolve(false);
			},
			()=>{
			});
		});
  }

  validateMobileFunc(){
    if(this.hpbpMobile == this.hpbsMobile){
      this.validMobile = false;
      this.validFlag = false;
    }else{
      this.validMobile = true;
      this.validFlag = true;
    }
  }

  removeimage(type,index){
    if(type == 'profile'){
      this.profileData=[];
      this.profileImage = '';
      this.profileshow= this.profileDefaultImg;
    }else{
      this.imgshow.splice(index, 1);
      this.id_card_image_array.splice(index, 1);
      //this._albums.splice(index, 1);
      this.defaultImg.splice(index, 1);
    }
  }

  userSubmit(){
    this.validFlag=true;
    this.submitted = true;
    this.switchingErrFlag = false;
    this.maintainErrFlag = false;
    this.hpbidCrdAdd = this.hpbidCrdAdd.trim();
    this.hpbdmclAdd = this.hpbdmclAdd.trim();

    if(!this.hpbName.valid || !this.type.value || !this.pMobile.valid || !this.hpbpOBrth || !this.hpbdOBrth || !this.hpbidCrdNo || !this.hpbidCrdAdd || !this.idProvinceValue.name || !this.idCityValue.name || !this.idSubdistrictValue.name || !this.idPostalCodeValue.postal_code || !this.comments.valid) {
      this.validFlag=false;
    }

    //if add secondary mobile then validate it
    if(this.hpbsMobile && !this.sMobile.valid){
      this.validFlag=false;
    }

    //if add email then validate it
    if(this.hpbemail && !this.email.valid){
      this.validFlag=false;
    }

    if(!this.issmdom.value){
      if(!this.hpbdmclAdd || !this.domProvinceValue.name || !this.domCityValue.name || !this.domSubDistrictValue.name || !this.domPostalCodeValue.postal_code ){
        this.validFlag=false;
      }
    }

    if(this.type.value == 'contractor'){
      if(!this.cmpnyName.valid || !this.cmpnyRName.valid){
        this.validFlag=false;
      }
    }

    if(this.hpbstatus!=this.hpbstatusinit && this.hpbstatus=='switching' && !this.hpb_prospect_switching_dt){
      this.validFlag=false;
      this.switchingErrFlag = true;
    }
    
    if(this.hpbstatus!=this.hpbstatusinit && this.hpbstatus=='maintain' && !this.hpb_switching_maintain_dt){
      this.validFlag=false;
      this.maintainErrFlag = true;
      if(!this.hpb_prospect_switching_dt){
        this.switchingErrFlag = true;
      }
    }

    if(this.validFlag){
     
      if(this.hpb_prospect_switching_dt!=null && this.hpb_prospect_switching_dt!='' && this.hpb_prospect_switching_dt!=NaN){
        this.switching_dt = moment(this.hpb_prospect_switching_dt).unix()*1000;
        
      }else{
        this.switching_dt = null;
        
      }

      if(this.hpb_switching_maintain_dt!=null && this.hpb_switching_maintain_dt!='' && this.hpb_switching_maintain_dt!=NaN){
        this.maintain_dt = moment(this.hpb_switching_maintain_dt).unix()*1000;
       
      }else{
        this.maintain_dt = null;
        
      }

      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'fa fa-question-circle',
        accept: () => {
            //  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}];
          this.submit();
        },
        reject: () => {
            // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
        }
      });
    }else{
      this.result = "Please enter a valid inputs";
      this.display=true;
      this.success = false;
    }
	}

  async submit() {
    this.submitted=true;
    let uploadFlag:any=true;
    //upload profile image
    if(this.profileData!="" && this.profileData!=undefined){
      uploadFlag = await this.uploadImage('profile', this.profileData);
    }

    let uploadFlag1:any=true;
    //upload ID card image
    if(this.allData!="" && this.allData!=undefined){
      for(let i=0;i<this.allData.length;i++){
        uploadFlag1 = await this.uploadImage('doc',this.allData[i]);
      }      
    }

    if(!this.id_card_image_array.length){
      this.validFlag=false;
      this.imgErrDisplay = true;
      this.imgErr = "Please select at least one image";
    }

    //if user not update image then upload previous image
    if(this.newProfileImage == "" || this.newProfileImage == null){
      this.newProfileImage = JSON.stringify(this.profile_image_array);
    }

    //if user not update image then upload previous image
    if(this.newimageName == "" || this.newimageName == null){
      this.newimageName = JSON.stringify(this.id_card_image_array);
    }

    if(this.issmdom.value==1){
      this.hpbdmclAdd={};
      this.domProvinceValue={};
      this.domCityValue={};
      this.domSubDistrictValue={};
      this.domPostalCodeValue={};
      this.hpbdmclAdd=this.hpbidCrdAdd;
      this.domProvinceValue=this.idProvinceValue;
      this.domCityValue=this.idCityValue;
      this.domSubDistrictValue=this.idSubdistrictValue;
      this.domPostalCodeValue=this.idPostalCodeValue;
    }

    var dt=new Date(this.hpbdOBrth).getTime();
    if(this.validFlag){
      let para= {};
      para={
        role : this.rolename,
        hpb_name: this.hpbnameval,
        hpb_type: this.type.value,
        hpb_profile_pic: this.newProfileImage,
        primary_mobile_no: this.hpbpMobile,
        secondary_mobile_no: this.hpbsMobile,
        hpb_email: this.hpbemail,
        place_of_birth: this.hpbpOBrth,
        date_of_birth: dt,
        id_card_number: this.hpbidCrdNo,
        id_photo: this.newimageName,
        id_card_address: this.hpbidCrdAdd,
        id_card_province: this.idProvinceValue.name,
        id_card_city: this.idCityValue.name,
        id_card_sub_district: this.idSubdistrictValue.name,
        id_card_pincode: this.idPostalCodeValue.postal_code,
        domicile_same_as_id_card: this.issmdom.value,
        domicile_address: this.hpbdmclAdd,
        domicile_province: this.domProvinceValue.name,
        domicile_city: this.domCityValue.name,
        domicile_sub_district: this.domSubDistrictValue.name,
        domicile_pincode: this.domPostalCodeValue.postal_code,
        company_name: this.hpbcmpnyName,
        company_representative_name: this.hpbcmpnyRName,
        company_designation: this.hpbdsgntn,
        additional_comments: this.hpbcomments,
        prospect_switching_dt:this.switching_dt,
        switching_maintain_dt:this.maintain_dt,
        hpb_status:this.hpbstatus
      }

			this.busy = this.hpbApi.addEditHpb(para,this.id).subscribe((Res)=>{
        console.log(Res.result);
        this.result = Res.result.status;
        if(Res.result.status == 'success'){
          this.success = true;
        }
        this.display=true;
			},(userErr)=>{
        this.success = false;
        this.result = userErr.message;
        this.display=true;
      });
      // console.log("Para",para);
    }else{
      this.result = "Please enter a valid inputs";
      this.display=true;
      this.success = false;
      this.submitted=false;
    }
  }
}