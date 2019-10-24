import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ContainerApi,LoopBackAuth,RewardApi, Reward_promosApi,Reward_categoryApi }   from '../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import * as moment from 'moment';
import {Headers, Http, Response} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import { ALL_CONSTANTS } from '../../../providers/constants';
declare var hostname:any;
@Component({
  templateUrl: 'edit-reward.component.html'
})

export class EditRewardComponent {

	prmtnFldArray:any = [];
	@ViewChild('rewardname') rewardname: NgModel;
	@ViewChild('rewarddescription') rewarddescription: NgModel;
	@ViewChild('rewardpoints') rewardpoints: NgModel;
	@ViewChild('rewarditem') rewarditem: NgModel;
	@ViewChild('rewcategory') rewcategory: NgModel;
	@ViewChild('rewstatus') rewstatus: NgModel;
	@ViewChild('rewardcode') rewardcode: NgModel;
	@ViewChild('rewardimage') rewardimage: NgModel;
	display:boolean = false;
	submitted:boolean = false;
	result:any;
	rewardData:any = {};
	promos:any;
	addPromErr:any;
	promErrDisplay:boolean = false;
	count:any=0;
	promErr:boolean = false;
	invalidDates:any = [];
	enteredDates:any = [];
	removedPrmtnFldArrayNo:any = [];
	temp:any = [];
	dates:any = [];
	matched:boolean = false;
	userDetails:any;
	rolename:any;
	name:any;
	description:any;
	points:any;
	code:any;
	item:any;
	rewardcategory:any="";
	rewardstatus:any="";
	promoId:any=[];
	public id: number;
	frstAdd:boolean = true;
	mindate:Date;
	category:any;
	imageName:any='';
	msgs: any=[];
    imgshow:any;
	uploadedFiles: any[] = [];
	rewimage:any;
	data:any;
	imgErrDisplay:boolean=false;
	loading:boolean=false;
	imgErr:any='';
	defaultImgName:any;
	defaultImg:any;
	busy:any;
	constructor(private container:ContainerApi,
		private _cookieService:CookieService, 
		private rewCat:Reward_categoryApi,
		private reward:RewardApi, 
		private loopAuth:LoopBackAuth, 
		private promo:Reward_promosApi, 
		private router: ActivatedRoute,
		private http:Http){
		// this.router.queryParams.subscribe(params => {
			// this.id = params["id"];
		// });
		this.id = this.router.snapshot.params['id'];
	}
	
	ngOnInit(): void {
		this.mindate = new Date();
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		this.busy=this.reward.getRewardsDashboard("","","","","","","","","","",this.id).subscribe(
			data=>{
				this.rewardData = data.result[0];
				this.name = this.rewardData.name;
				this.description = this.rewardData.description;
				this.points =this.rewardData.points;
				this.code = this.rewardData.reward_code;
				this.item = this.rewardData.reward_item;
				this.rewardcategory = this.rewardData.reward_cat_id;
				this.rewardstatus = this.rewardData.status;
				let promos = data.result[0].promo.length;
				this.count = promos;
				this.defaultImg = hostname+"/api/container/reward/download/"+this.rewardData.image;
				this.defaultImgName = this.rewardData.image;
				this.imgshow = hostname+"/api/container/reward/download/"+this.rewardData.image;
				this.imageName = this.rewardData.image;
				for(var i=0; i<promos; i++){
					
					// data.result[0].promo[i]['start_date'] = moment(data.result[0].promo[i]['start_date']).format("DD-MM-YYYY");
					// data.result[0].promo[i]['end_date'] = moment(data.result[0].promo[i]['end_date']).format("DD-MM-YYYY");
					
					console.log(data.result[0].promo[i]['end_date']);
					
					var frmdt = data.result[0].promo[i]['start_date'].split("T");
					frmdt = frmdt[0].split("-");
					var todt = data.result[0].promo[i]['end_date'].split("T");
					todt = todt[0].split("-");

					console.log(todt);
					
					data.result[0].promo[i]['start_date'] = new Date(frmdt[0],(frmdt[1]-1),frmdt[2]);
					data.result[0].promo[i]['end_date'] = new Date(todt[0],(todt[1]-1),todt[2]);
					
					console.log(data.result[0].promo[i]['end_date']);
					
					var frmdtDisable = false;
					var todtDisable = false;
					if(data.result[0].promo[i]['start_date']<Date.now()){
						frmdtDisable = true;
					}
					if(data.result[0].promo[i]['end_date']<Date.now()){
						todtDisable = true;
					}
					this.prmtnFldArray.push({
						promFrm: data.result[0].promo[i]['start_date'],
						frmdtDisable : frmdtDisable, 
						promTo: data.result[0].promo[i]['end_date'], 
						todtDisable : todtDisable,
						promPts: data.result[0].promo[i]['promo_points']
					});
					
					this.getDates(data.result[0].promo[i]['start_date'],data.result[0].promo[i]['end_date']);
					for(var j=0; j<this.dates.length; j++){
						this.enteredDates.push(this.dates[j]);
					}
					if(i+1 == promos){
						console.log(this.invalidDates);
						this.prmtnFldArray.push({promFrm: null, promTo: null, "promPts": null});
						this.count++;
					}
					this.promoId[i] =data.result[0].promo[i]['id']
				}
				if(promos==0){
					this.prmtnFldArray.push({promFrm: null, promTo: null, "promPts": null});
					this.count++;
				}
				
			},
			err=>{
				
			},
			()=>{
				
			}
		);
		this.busy=this.rewCat.find().subscribe(
			data=>{
			this.category = data;
			},
			err=>{

			},
			()=>{

			}
		)
    }
	
	submit(){
		this.submitted=true;
		//this.updateFun();
		// to get server created date
		this.addPromErr='';
		this.checkForValidDate();
		if((!this.matched && this.prmtnFldArray[this.count-1]['promFrm']!=null && this.prmtnFldArray[this.count-1]['promTo']!=null) || (this.prmtnFldArray[this.count-1]['promFrm']==null && this.prmtnFldArray[this.count-1]['promTo']==null)){
			if(this.rewardname.valid && this.rewarddescription.valid && this.rewardpoints.valid &&
				this.rewardcode.valid && this.rewarditem.valid && this.rewcategory.valid){
				if(this.data!=""&&this.data!=undefined){
				 	let fileUrl = hostname+"/api/container/reward";
				 	let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
				 	this.busy=this.http.post(fileUrl + '/upload?access_token='+loginFlagToken, this.data).subscribe(res=>{
				 		var dataimg = res['_body'];
				 		dataimg = JSON.parse(dataimg);
				 		this.imageName = dataimg['result']['files']['file'][0]['name'];
				 		this.updateFun();
				 	},
				 	err=>{
				 		this.imgErr = "Image upload failed" ;
						this.imgErrDisplay = true;	
				 	},
				 	()=>{
					})
				}else{
					this.updateFun();
				}
			}
		}
		else{
			this.addPromErr='Dates are not proper.';
			this.promErrDisplay=true;
		}
		
	}

	updateFun(){
		let para = {};
		var user_id = this.userDetails.userDet.id;
		var createdAt = Math.floor(Date.now());
		var submitErr = false;
		para = { 
			name:this.rewardname.value, 
			description:this.rewarddescription.value,
			points:this.rewardpoints.value,
			reward_code:this.rewardcode.value,
			reward_item:this.rewarditem.value,
			reward_cat_id:this.rewcategory.value, 
			status:this.rewstatus.value,
			image:this.imageName,
			created_by:user_id, 
			created_date:createdAt 
		};
		
		var FinalprmtnFldArray ;
		FinalprmtnFldArray = this.prmtnFldArray;
		if(FinalprmtnFldArray!=""){
			for(var i=0; i<FinalprmtnFldArray.length; i++){
				if(FinalprmtnFldArray[i]['promPts'] > 0 && FinalprmtnFldArray[i]['promFrm']!=null &&
				FinalprmtnFldArray[i]['promTo']!=null){
					FinalprmtnFldArray[i]['promFrm'] = moment(FinalprmtnFldArray[i]['promFrm']).format("YYYY-MM-DD");
					FinalprmtnFldArray[i]['promTo'] = moment(FinalprmtnFldArray[i]['promTo']).format("YYYY-MM-DD");
					FinalprmtnFldArray[i]['status'] = 1;
					if(i<this.promoId.length){
						FinalprmtnFldArray[i]['id'] = this.promoId[i];
						this.promoId.splice(i, 1); 
					}else{
						FinalprmtnFldArray[i]['id'] = "";
					}
				}else{
					if(i==FinalprmtnFldArray.length-1){
						FinalprmtnFldArray.pop();
					}else{
						this.addPromErr='Please enter a valid entry in '+i+1+'th Promotion.';
						this.promErrDisplay=true;
						var submitErr = true;
					}
				}
			}
		}
		
		//console.log(this.promoId);
		if(submitErr != true){
			this.loading = true;
			this.busy=this.reward.addEditReward(para,this.id).subscribe((Res)=>{
				if(Res){
					this.loading = false;
					this.result = "success";
					this.display=true;
					this.promo.addEditPromos(FinalprmtnFldArray,this.id,user_id).subscribe((Res2)=>
						{
							this.result = "success";
							this.display=true;
							window.location.reload();
						},
						err=>{
							console.log('err');
							this.result = "failed";    
							this.display=true;
						},
						()=>{
						}
					);
					let status = {status:0};
					for(var i=0; i<this.promoId.length; i++){
						this.promo.replaceById(this.promoId[i],status).subscribe((Res2)=>
							{
								console.log("delete"+this.promoId[i]);
							},
							err=>{
								
							},
							()=>{
							}
						);
					}
				}
				},err=>{
					this.result = "failed";    
					this.display=true;
					this.loading = false;
				},
				()=>{
					this.loading = false;
				}
			)
		}
	}

	onFileChange(file){
		this.imgErrDisplay = false;
		this.data = new FormData();
		var imageData2 = new FileReader();
		if(file.target.files[0]){
			var fileSize = Math.round((file.target.files[0].size)/1024);  
			var imgExt = file.target.files[0].name.split(".");
			console.log(file.target.files[0].type);
			if(imgExt.length > 2){
				//file.target.files="";
				this.imgErr = "Invalid Image Format / Image name";
				this.imgErrDisplay = true;
				this.rewimage = "";
				this.imgshow = "";
				this.data = "";
			}else if( ((file.target.files[0].type)!="image/jpg") && ((file.target.files[0].type)!="image/png") && ((file.target.files[0].type)!="image/jpeg")){
				//file.target.files[0]=""; 
				this.imgErr = "Invalid Image Format" ;
				this.imgErrDisplay = true;
				this.rewimage = "";
				//file.target.files[0]= "";
				this.data = "";
			}else if(fileSize > 5200){//chk img size
				//file.target.files[0]="";
				this.imgErrDisplay = true;			
				this.imgErr = "Invalid Image Size" ;
				this.rewimage = "";
				//file.target.files[0]= "";
				this.data = "";
				
			}else{
				imageData2.onload = (event:any) => {
					var img = new Image();
					img.src = event.target.result;
					if(img.width > 500 || img.height > 500){
						this.imgErr = "Invalid Image Dimension. It needs to be of max 500*500";
						this.imgErrDisplay = true;
						this.rewimage = "";
						this.data = "";
						this.imgshow = "";
					}else{
						this.imgshow= event.target.result;
						this.data.append("file", file.target.files[0]);
					}
					
				}
				imageData2.readAsDataURL(file.target.files[0]);
				
			}
		}
	}

	AddRwdFld(){
		this.promErrDisplay=false;
		if((this.prmtnFldArray[this.count-1]['promFrm']!=null || this.prmtnFldArray[this.count-1]['promTo']!=null || this.prmtnFldArray[this.count-1]['promPts']!=null) && (moment(this.prmtnFldArray[this.count-1]['promFrm']).unix() < moment(this.prmtnFldArray[this.count-1]['promTo']).unix())){
			this.checkForValidDate();
			if(!this.matched){
				for(var i=0; i<this.dates.length; i++){
					this.enteredDates.push(this.dates[i]);
				}
				this.count++;
				var arr = {promFrm: null, promTo: null, "promPts": null};
				(this.prmtnFldArray).push(arr);
			}else{
				this.addPromErr='Dates are not proper.';
				this.promErrDisplay=true;
			}
		}else{
			this.addPromErr='Please enter a valid entry above then add new .';
			this.promErrDisplay=true;
		}
	}

	checkForValidDate(){
		this.matched = false;
		this.getDates(this.prmtnFldArray[this.count-1]['promFrm'],this.prmtnFldArray[this.count-1]['promTo']);
		console.log(this.temp);
		console.log(this.enteredDates);
		for(var i=0; i<this.temp.length; i++){
			if(this.enteredDates.indexOf(this.temp[i]) >= 0 ){
				console.log('matched');
				this.matched = true;
			}
		}
	
	}
    
	removeRwdFld(i){
		this.promErrDisplay=false;
		this.count--;
		this.removedPrmtnFldArrayNo.push(i);
		if(this.prmtnFldArray[i]['promFrm']!=null){
			if(this.prmtnFldArray[i]['promFrm']>Date.now()){
				this.RemoveDates(this.prmtnFldArray[i]['promFrm'],this.prmtnFldArray[i]['promTo']);
				this.prmtnFldArray.splice(i,1);
			}else{
				this.addPromErr='Promotion period is Running/Done cant remove';
				this.promErrDisplay=true;
			}
		}
		//for oth promotion
		if(this.prmtnFldArray.length < 1){
			this.prmtnFldArray.push({promFrm: null, promTo: null, "promPts": null});
			this.count++;
		}
	}

	getDates(startDate, endDate) {
		if(startDate!=null&&endDate!=null){
			this.temp = [];
			this.dates = [];
			var currentDate = startDate,
			addDays = function(days) {
				var date = new Date(this.valueOf());
				date.setDate(date.getDate() + days);
				return date;
			};
			while (currentDate <= endDate) {
				this.temp.push("'"+currentDate+"'");
				this.dates.push("'"+currentDate+"'");
				this.invalidDates.push(currentDate);
				currentDate = addDays.call(currentDate, 1);
			}
		}
	}    

	RemoveDates(startDate, endDate) {
		var currentDate = startDate,
		addDays = function(days) {
			var date = new Date(this.valueOf());
			date.setDate(date.getDate() + days);
			return date;
		};
		while (currentDate <= endDate) {
			var index = this.enteredDates.indexOf("'"+currentDate+"'");
			if (index > -1) { 
				this.invalidDates.splice(index, 1); 
				this.enteredDates.splice(index, 1);
			}
			currentDate = addDays.call(currentDate, 1);
		}
	}  
	
	removeimage(){
		this.data=[];
		this.rewimage = '';
		this.imgshow= this.defaultImg;
	} 
}
