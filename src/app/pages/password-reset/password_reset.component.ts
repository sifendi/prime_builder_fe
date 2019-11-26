import { Component, OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoopBackConfig, App_usersApi,App_loginApi }  from '../../../shared/loopback_sdk';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Message} from 'primeng/primeng';
import {CookieService} from 'angular2-cookie/core';
declare var $;
@Component({
  templateUrl: 'password_reset.component.html'
})
export class PasswordResetComponent {
	@ViewChild('password') password:any;
	@ViewChild('cpassword') cpassword:any;
	result: any;
	display:boolean=false;
	passwordNew:any;
	cpasswordNew:any;
	busy:  Subscription;
	msgs: Message[] = [];
	token:any;
	ifValid:boolean;
	uid:any;
	errorMsg:any = "Loading....";
	
	constructor(private route: ActivatedRoute, private router:Router,private appLoginApi:App_loginApi,private userApi:App_usersApi,private _cookieService:CookieService) {
     
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		this.token = this.route.snapshot.params["token"];
		  
		if (loginFlagToken) {
			this.router.navigate(["/dashboard"]);
		}
		
		// check if the token is valid
		let obj = {
			"token":this.token
		}
		this.appLoginApi.userResetOrForgotPassVerify(obj).subscribe(
			data=>{
				if(data && data.length > 0){
					this.ifValid = true;
					this.uid = data[0]['uId'];
				}else{
					this.ifValid = false;
					this.errorMsg = "This url has expired, please try resetting your password again!";
				}
			},
			(err)=>{
				
			},
			()=>
			{
				
			}
		);
	}

	ngOnInit(): void {
		console.log('ngOnInit');
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		if (loginFlagToken) {
			this.router.navigate(["/dashboard"]);
		}
	}
	
	setPassword(){
		if(this.passwordNew && this.password.valid){
			if(this.passwordNew == this.cpasswordNew && this.passwordNew!=""){
				let obj = {
					"password":this.passwordNew,
					"id":this.uid,
					"token":this.token
				};
				this.appLoginApi.userResetOrForgotPassChange(obj).subscribe(
					data=>{
						if(data && data.length > 0){
							// $.alert({
							// 	title: 'Status!',
							// 	content: 'Password updated successfully!',
							// });
							this.display = true;
							this.result = "success"
						}else{
							// $.alert({
							// 	title: 'Error!',
							// 	content: 'Something went wrong!',
							// });
							this.display = true;
							this.result = "Something went wrong"
						}
					},
					(err)=>{
						
					},
					()=>
					{
						
					}
				);
			}else{
				// $.alert({
				// 	title: 'Error!',
				// 	content: 'Password and confirm password does not match!',
				// });
				this.display = true;
				this.result = "Password and confirm password does not match"
			}
		}else{
			// $.alert({
			// 	title: 'Error!',
			// 	content: 'Please Enter Minimum 6 Character Password!',
			// });
			this.display = true;
			this.result = "Please enter minimum 6 character password"
		}
	}

	redirectLogin(){
		this.router.navigate(["/login"]);
	}
}