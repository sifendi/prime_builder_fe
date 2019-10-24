import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService} from 'angular2-cookie/core';
import { LoopBackConfig, LoopBackAuth, UserApi, App_usersApi }  from '../../shared/loopback_sdk';

@Injectable()

export class AuthenticatedRole implements CanActivate {
    
	userData:any = {};
	roleName:any;
	constructor(private router: Router,private _cookieService:CookieService, private loopAuth:LoopBackAuth, private uApi:App_usersApi){
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		this.uApi.getUserRole(loginFlagToken).subscribe(
			data=>{
				this.roleName = data.result[0].name;
			},
			(err)=>{},
			()=>{}
		)
    }
	
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		// this.userData = this.loopAuth.getCurrentUserData();
		// var role = this.userData.userDet.roles[0].name;
		var currentUrl = state.url;
		var tlhArr = ["/dashboard","/visit-plan","/add-visit-plan","/monthly-forecast-target","/add-monthly-forecast-target","/rds"];
		var acArr = ["/dashboard","/monthly-actual-target","/add-monthly-actual-target","/ac-reports/scorecard","/eap-support-assignment"];
		var amArr = ["/ac-reports/scorecard"];
		
		if((this.roleName == "$tlh") && (tlhArr.indexOf(currentUrl) < 0)){
			this.router.navigate(['/dashboard', {}]);
			return false;
		}else if((this.roleName == "$ac") && ((acArr.indexOf(currentUrl) < 0) && (currentUrl.indexOf("/ac-reports/web-view") < 0)) && ((acArr.indexOf(currentUrl) < 0) && (currentUrl.indexOf("/view-eap-support-assignment") < 0))){
			this.router.navigate(['/dashboard', {}]);
			return false;
		}else if((this.roleName == "$am") && ((currentUrl.indexOf("/ac-reports/web-view") < 0))){ // if am is trying to view ac reports, redirect him
			this.router.navigate(['/dashboard', {}]);
			return false;
		}else{
			return true;
		}
    }
}