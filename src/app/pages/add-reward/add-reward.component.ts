import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { ContainerApi,Reward_categoryApi, LoopBackAuth,RewardApi, Reward_promosApi }   from '../../../shared/loopback_sdk';
import {CalendarModule} from 'primeng/primeng';
import * as moment from 'moment';
import {Headers, Http, Response} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import { ALL_CONSTANTS } from '../../../providers/constants';
declare var hostname:any;
@Component({
  templateUrl: 'add-reward.component.html'
})

export class AddRewardComponent {

	prmtnFldArray:any = [];
	@ViewChild('rewardname') rewardname: NgModel;
	@ViewChild('rewarddescription') rewarddescription: NgModel;
	@ViewChild('rewardpoints') rewardpoints: NgModel;
	@ViewChild('rewardcode') rewardcode: NgModel;
	@ViewChild('rewarditem') rewarditem: NgModel;
	@ViewChild('rewardcategory') rewardcategory: NgModel;
	@ViewChild('rewardimage') rewardimage: NgModel;
	@ViewChild('rewstatus') rewstatus: NgModel;
	
	rewdname:any;
	rewdescription:any;
	rewpoints:any;
	rewcode:any;
	rewitem:any;
	rewcategory:any="";
	rewardstatus:any="";
	rewimage:any;
	
	display:boolean = false;
	submitted:boolean = false;
	result:any;
	rewardId:any;
	count:any=1;
	addPromErr:any;
	promErrDisplay:boolean = false;
	invalidDates:any = [];
	enteredDates:any = [];
	removedPrmtnFldArrayNo:any = [];
	temp:any = [];
	dates:any = [];
	userDetails:any;
	rolename:any;
	matched:boolean = false;
	category:any = [];
	files:any;
	imageName:any;
	imageData:any;
	imgErrDisplay:boolean=false;
	imgErr:any='';
	loading:boolean=false;
	imgshow:any='';
	busy:any;
	constructor(private _cookieService:CookieService, private reward:RewardApi, private loopAuth:LoopBackAuth, private promo:Reward_promosApi, private rewCat:Reward_categoryApi, private container:ContainerApi, private http:Http, private router:Router) {}
	
	ngOnInit(): void {
		this.prmtnFldArray.push({promFrm: null, promTo: null, "promPts": null});
		this.userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = this.userDetails.userDet.roles[0].name;
		
		this.rewCat.find().subscribe(
			data=>{
				this.category = data;
			},
			err=>{

			},
			()=>{

			}
		)
    }
	onFileChange(file){
		this.imgErrDisplay = false;
		this.imageData = new FormData();
		var imageData2 = new FileReader();

		if(file.target.files[0]){
			var fileSize = Math.round((file.target.files[0].size)/1024);  
			var imgExt = file.target.files[0].name.split(".");
			if(imgExt.length > 2){
				//file.target.files="";
				this.imgErr = "Invalid Image Format / Image name";
				this.imgErrDisplay = true;
				this.rewimage = "";
				this.imageData = "";
				this.imgshow = "";
			}else if( ((file.target.files[0].type)!="image/jpg") && ((file.target.files[0].type)!="image/png") && ((file.target.files[0].type)!="image/jpeg")){
				//file.target.files="";
				this.imgErr = "Invalid Image Format" ;
				this.imgErrDisplay = true;
				this.rewimage = "";
				this.imageData = "";
				this.imgshow = "";
			}else if(fileSize > 5200){//chk img size
				//file.target.files="";
				this.imgErrDisplay = true;			
				this.imgErr = "Invalid Image Size" ;
				this.rewimage = "";
				this.imageData = "";
				this.imgshow = "";
			}else{
				imageData2.onload = (event:any) => {
					this.imgshow= event.target.result;
					var img = new Image();
					img.src = event.target.result;
					if(img.width > 500 || img.height > 500){
						this.imgErr = "Invalid Image Dimension. It needs to be of max 500*500";
						this.imgErrDisplay = true;
						this.rewimage = "";
						this.imageData = "";
						this.imgshow = "";
					}else{
						this.imageData.append("file", file.target.files[0]);
					}
				}
				imageData2.readAsDataURL(file.target.files[0]);
			}
		}
		
	}
	submit(){
		this.submitted=true;
		this.imgErrDisplay = false;
		this.addPromErr='';
		this.checkForValidDate();
		if((!this.matched && this.prmtnFldArray[this.count-1]['promFrm']!=null && this.prmtnFldArray[this.count-1]['promTo']!=null) || (this.prmtnFldArray[this.count-1]['promFrm']==null && this.prmtnFldArray[this.count-1]['promTo']==null)){
			
			if(!(this.imageData!=""&&this.imageData!=undefined)){
				this.imgErr = "Please upload Image" ;
				this.imgErrDisplay = true;
			}
			if(this.rewardname.valid && this.rewarddescription.valid && this.rewardpoints.valid&&
				this.rewardcode.valid && this.rewarditem.valid && this.rewardcategory.valid&&this.imageData!=""&&this.imageData!=undefined){
				let fileUrl = hostname+"/api/container/reward";
				let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
				this.loading = true;
				this.busy=this.http.post(fileUrl + '/upload?access_token='+loginFlagToken, this.imageData).subscribe(res=>{
					var dataimg = res['_body'];
					dataimg = JSON.parse(dataimg);
					this.imageName = dataimg['result']['files']['file'][0]['name'];
					this.updateFun();
				},
				err=>{
					this.imgErr = "Image upload failed" ;
					this.imgErrDisplay = true;
					this.loading = false;
				},
				()=>{
				})
				// this.updateFun();				
			}
		}else{
			this.addPromErr='Dates are not proper.';
			this.promErrDisplay=true;
		}
	}
	updateFun(){
		let para = {};
		var user_id = this.userDetails.userDet.id;
		var createdAt = Math.floor(Date.now()); // to get server created date
		if(this.imageName==null){
			this.imageName = "";
		}
		para = { 
			name:this.rewdname, 
			description:this.rewdescription,
			points:this.rewpoints,
			reward_code:this.rewcode,
			reward_item:this.rewitem,
			reward_cat_id:this.rewcategory,
			status:this.rewardstatus,
			image:this.imageName,
			created_by:user_id, 
			created_date:createdAt 
		};
		this.loading = true;
		this.busy=this.reward.addEditReward(para).subscribe((Res)=>{
				if(Res){
					this.loading = false;
					console.log(Res);
					var resltId = Res['result']["id"];
					
					this.removeimage();
					this.submitted = false;
					this.result = "success";
					this.display=true;
					
					
					if(this.prmtnFldArray!="" && (this.prmtnFldArray[0]['promFrm']!=null && this.prmtnFldArray[0]['promTo']!=null && this.prmtnFldArray[0]['promPts']!=null)){
						for(var i=0; i<this.prmtnFldArray.length; i++){
							if(this.prmtnFldArray[i]['promPts'] > 0){
								this.prmtnFldArray[i]['promFrm'] = moment(this.prmtnFldArray[i]['promFrm']).format("YYYY-MM-DD");
								this.prmtnFldArray[i]['promTo'] = moment(this.prmtnFldArray[i]['promTo']).format("YYYY-MM-DD");
								this.prmtnFldArray[i]['status'] = 1;
							}
						}
						this.promo.addEditPromos(this.prmtnFldArray,resltId,user_id).subscribe((Res2)=>
							{
								this.result = "success";
								this.display=true;
								setTimeout(()=>{
									this.router.navigate(["/reward"]);
								},3000);
							},
							err=>{
								console.log('err');
								this.result = "failed";    
								this.display=true;
							},
							()=>{
								
							}
						);
					}else{
						setTimeout(()=>{
							this.router.navigate(["/reward"]);
						},3000);
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
		console.log(this.prmtnFldArray[this.count-1]['promFrm']);
		console.log(this.prmtnFldArray[this.count-1]['promTo']);
		this.getDates(this.prmtnFldArray[this.count-1]['promFrm'],this.prmtnFldArray[this.count-1]['promTo']);
		for(var i=0; i<this.temp.length; i++){
			
			if(this.enteredDates.indexOf(this.temp[i]) >= 0){
				this.matched = true;
			}
		}
	}
	removeRwdFld(i){
		this.count--;
		this.removedPrmtnFldArrayNo.push(i);
		if(this.prmtnFldArray[i]['promFrm']!=null){
			this.RemoveDates(this.prmtnFldArray[i]['promFrm'],this.prmtnFldArray[i]['promTo']);
		}
		this.prmtnFldArray.splice(i,1);
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
			console.log(currentDate);
			var index = this.enteredDates.indexOf("'"+currentDate+"'");
			if (index > -1) { 
				console.log(index);
				this.invalidDates.splice(index, 1); 
				this.enteredDates.splice(index, 1);
			}
			currentDate = addDays.call(currentDate, 1);
		}
		console.log(this.invalidDates);
	} 
	removeimage(){
		this.imageData="";
		this.rewimage = '';
		this.imgshow= '';
	}  
}

