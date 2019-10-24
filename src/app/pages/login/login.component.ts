import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, UserApi, App_loginApi }  from '../../../shared/loopback_sdk';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Message} from 'primeng/primeng';
import {CookieService} from 'angular2-cookie/core';

declare var EventSource:any;

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
	username:any;
	password:any;
	busy:  Subscription;
	msgs: any;
	display :any;
	userDetails:any = {};

	constructor(private router:Router,private userApi:UserApi, private login: App_loginApi, private _cookieService:CookieService, private loopAuth:LoopBackAuth) {
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		console.log('loginFlagToken',loginFlagToken);
		if (loginFlagToken) {
		this.router.navigate(["/dashboard"]);
		}
	}
  
	ngOnInit(): void {
		console.log('ngOnInit');
		let loginFlagToken = this._cookieService.get('$LoopBackSDK$id');
		if (loginFlagToken) {
			this.router.navigate(["/dashboard"]);
		}
    }

	handleEnter(event){
		if(event.keyCode == 13){
			this.loginClick();
		}
	}
    loginClick(){

		this.router.navigate(['/dashboard', {}]);

		this.hide();
		let creds= {};
		if(this.validateEmail(this.username)){
			creds = {email:this.username,password:this.password}
     
		}else{
			creds = {username:this.username,password:this.password}
		}
		
		this.busy = this.userApi.login(creds).subscribe((userRes)=>{
			if(userRes){
				this.login.getUserDetails(creds).subscribe((userRes2)=>{
					this.userDetails = this.loopAuth.getCurrentUserData();
					this.userDetails.userDet = userRes2.user;
					this.loopAuth.setUser(this.userDetails);
					this.router.navigate(['/dashboard', {}]);
				});
			}
			
		},(userErr)=>{
			console.log('UserError',userErr);
			this.password=null;
			this.display = true;
			this.msgs = 'Invalid Login.';
		});
    }

	// show() {
	// 	this.msgs.push({severity:'info', summary:'Invalid Login.', detail:''});
	// }

	hide() {
		this.msgs = [];
	}

	validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
	}

}