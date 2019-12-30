import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, UserApi, App_usersApi }  from '../../shared/loopback_sdk';

import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {CookieService} from 'angular2-cookie/core';

import { ShareService } from '../../providers/share-service/share-service';

declare var EventSource:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

	currUserData:any=null;
	
	menuProject:any =[];
	menuReward:any = [];
	menuReport:any = [];
	menuUpload:any = [];
	menuEap:any = [];
	
	defaultRoles:any = "";
	menuItem:any = "";
	username:any;
	busy:any;
	currUsernameDisplay:any="DyD";
	accTokUrl:String="access_token=";
	constructor(private router:Router,private userApi:UserApi,private _cookieService:CookieService,public sharS:ShareService, private loopAuth:LoopBackAuth, private uApi:App_usersApi) { 
		//var userDetails = this.loopAuth.getCurrentUserData();
		//this.username = userDetails.realm;
		//this.defaultRoles = userDetails.userDet.roles[0].name;
		
		
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		this.uApi.getUserRole(loginFlagToken).subscribe(
			data=>{
				this.defaultRoles = data.result[0].name;
				this.username = data.result[0].realm;
				if(this.defaultRoles == "$tlh"){
					this.menuUpload = [
						{
							"link":"/monthly-forecast-target",
							"name":"Mason/Contractor Target"
						},
						{
							"link":"/visit-plan",
							"name":"Retailer/Distributor Target"
						}
					]
				}
				else if(this.defaultRoles == "$ac"){
					this.menuUpload = [
						{
							"link":"/monthly-actual-target",
							"name":"Monthly Actual Target"
						}
					];
					this.menuEap = [
						{
							"link":"/eap-support-assignment",
							"name":"EAP Support Assignment"
						}
					];
				}
				else if((this.defaultRoles == "$sa") || (this.defaultRoles == "$ra")){
					this.menuUpload = [
						{
							"link":"/monthly-actual-target",
							"name":"Monthly Actual Target"
						},
						{
							"link":"/monthly-forecast-target",
							"name":"Mason/Contractor Target"
						},
						{
							"link":"/visit-plan",
							"name":"Retailer/Distributor Target"
						}
					];
					this.menuReward = [
						{
							"link":"/redemption",
							"name":"Redemption"
						},
						{
							"link":"/rewardwishlist",
							"name":"Reward wishlist"
						}
					];
					this.menuReport = [
						{
							"link":"/ac-reports/scorecard",
							"name":"AC Reports"
						},
						{
							"link":"/am-reports",
							"name":"AM Reports"
						},
						{
							"link":"/hpb-reports",
							"name":"HPB Reports"
						},
						{
							"link":"/product-request-raw-data",
							"name":"Product Request Raw Data"
						},
						{
							"link":"/visit-sph-raw",
							"name":"SPH Visit Raw Data"
						}
						
					];
					this.menuProject = [
						{
							"link":"/project",
							"name":"Project"
						},
						{
							"link":"/rds-visit",
							"name":"RDS Visit"
						},
						{
							"link":"/product-receipt",
							"name":"All Product Receipt"
						},
						{
							"link":"/pending-product-receipt",
							"name":"Admin Pending Product Receipt"
						},
						{
							"link":"/cement-bag-removal",
							"name":"Cement Bag Removal"
						},
						{
							"link":"/product-request",
							"name":"Product Request"
						}
					];
				}
			},
			(err)=>{},
			()=>{}
		)
	}
	
	public disabled:boolean = false;
	public status:{isopen:boolean} = {isopen: false};

	public toggled(open:boolean):void {
		//console.log('Dropdown is now: ', open);
	}

	public toggleDropdown($event:MouseEvent):void {
		$event.preventDefault();
		$event.stopPropagation();
		this.status.isopen = !this.status.isopen;
	}

	logOut(){
		this.busy = this.userApi.logout().subscribe((dataLogout)=>{
			//console.log('dataLogout',dataLogout);
			this.sharS.setshareData('currUserData',null);
			this.sharS.setshareData('accTokUrl',null);
			this.router.navigate(["/login"]);
		},(dataError)=>{
			//console.log('dataError',dataError);
			this.sharS.setshareData('currUserData',null);
			this.sharS.setshareData('accTokUrl',null);
			this.router.navigate(["/login"]);
		});
	}
	ngOnInit(): void {}
	ngAfterViewInit(): void {
		//console.log('ngOnInit on full');
		let currentUrl = this.router.url;
		
		if((currentUrl == "/project")||(currentUrl.indexOf("view-project")>0)||(currentUrl.indexOf("rds-visit")>0)||(currentUrl.indexOf("product-receipt")>0)||(currentUrl.indexOf("pending-product-receipt")>0)||(currentUrl.indexOf("cement-bag-removal")>0)||(currentUrl.indexOf("product-request")>0)){
			this.menuItem = "projects";
		}
		else if((currentUrl.indexOf("rds")>0)||(currentUrl.indexOf("product")>0)||(currentUrl == "/reward")||(currentUrl.indexOf("region")>0)||(currentUrl.indexOf("province")>0)|| (currentUrl.indexOf("district")>0)||(currentUrl.indexOf("municipality")>0)||(currentUrl.indexOf("subdistrict")>0)||(currentUrl.indexOf("postalcode")>0)||(currentUrl.indexOf("project-type")>0)|| (currentUrl.indexOf("project-stage")>0)||(currentUrl.indexOf("nmc")>0)||(currentUrl.indexOf("view-reward")>0)||(currentUrl.indexOf("add-reward")>0)||(currentUrl.indexOf("edit-reward")>0)){
			this.menuItem = "masters";
		}
		else if((currentUrl.indexOf("users/sa")>0)||(currentUrl.indexOf("users/sph")>0)||(currentUrl.indexOf("users")>0)||(currentUrl.indexOf("users/am")>0)||(currentUrl.indexOf("users/ac")>0)||(currentUrl.indexOf("hpb")>0) || (currentUrl.indexOf("users/hpb-update-approval")>0)){
			this.menuItem = "users";
		}
		else if((currentUrl.indexOf("ac-reports")>0)||(currentUrl.indexOf("am-reports")>0) ||(currentUrl.indexOf("hpb-reports")>0)){
			this.menuItem = "reports";
		}
		else if((currentUrl.indexOf("redemption")>0)||(currentUrl.indexOf("rewardwishlist")>0)){
			this.menuItem = "rewards";
		}  
		else if((currentUrl.indexOf("monthly-actual-target")>0)||(currentUrl.indexOf("monthly-forecast-target")>0)||(currentUrl.indexOf("visit-plan")>0)){
			this.menuItem = "uploads";
		}
		else if((currentUrl.indexOf("eap-support-assignment")>0)){
			this.menuItem = "eap";
		}
		
		let currUserData  = this._cookieService.get('$LoopBackSDK$user');
		let accessToken = this._cookieService.get('$LoopBackSDK$id');
		this.accTokUrl+=accessToken;
		this.sharS.setshareData('accTokUrl',this.accTokUrl);
		if (currUserData) {
			this.currUserData = JSON.parse(currUserData);
			let userType = null;
			let userAreaData={};
			this.currUsernameDisplay = this.currUserData['realname'];
		}else{
			this.router.navigate(["/login"]);
		}
	}

	changeMenu(menu){
		this.menuItem = menu;
		if(menu == "users"){
			this.router.navigate(["/users/sph"]);
		}else if(menu == "masters"){
			this.router.navigate(["/rds"]);
		}else if(menu == "projects"){
			this.router.navigate(["/project"]);
		}else if(menu == "reports"){
			this.router.navigate(["/ac-reports/scorecard"]);
		}else if(menu == "rewards"){
			this.router.navigate(["/redemption"]);
		}else if(menu == "uploads"){
			if(this.defaultRoles == "$tlh"){
				this.router.navigate(["/monthly-forecast-target"]);
			}else{
				this.router.navigate(["/monthly-actual-target"]);
			}
		}else if(menu == "eap"){
			this.router.navigate(["/eap-support-assignment"]);
		}
	}
	
	getUserNameEmail(str){
		let nameParts = str.split("@");
		let name = nameParts.length==2 ? nameParts[0] : null;
		return name;
	}
}