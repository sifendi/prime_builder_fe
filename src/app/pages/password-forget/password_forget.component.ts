import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackConfig, UserApi,App_loginApi }  from '../../../shared/loopback_sdk';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {Message} from 'primeng/primeng';
import {CookieService} from 'angular2-cookie/core';
declare var $;
@Component({
  templateUrl: 'password_forget.component.html'
})
export class PasswordForgetComponent {
  success: boolean;
  @ViewChild('uname') userEmMoN:any;
	// @ViewChild('eMail') eMail: any;
  username:any;
  password:any;
  busy:  Subscription;
  msgs: Message[] = [];
  result:any;
  display:boolean=false;

  //myTestVar:any="Deep";
  constructor(private router:Router,private appLoginApi:App_loginApi,private userApi:UserApi,private _cookieService:CookieService) {
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

  resetClick(){
    let self = this;
    //console.log(this.userEmMoN);
    if(this.userEmMoN.valid && self.username.trim()!=''){
      let flagType='username';
      if(!isNaN(self.username)){
        flagType='mobile';
      }else{
        let regX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regX.test(self.username)){
          flagType='email';
        }else{
          flagType='username';
        }
      }

      let credsObj={type:flagType,type_data:self.username,role:"HPB"};
      this.busy=this.appLoginApi.userResetOrForgotPassActionCheckReq(credsObj).subscribe((resSD:any)=>{
        if(resSD['status']){
            // $.alert({
            //   title: 'Success!',
            //   content: resSD['message'],
            // });
            this.display=true;
            this.success=true;
            this.result = resSD['message'];
        }else{
          // $.alert({
          //   title: 'Error!',
          //   content: resSD['message'],
          // });
          this.display=true;
          this.success=false;
          this.result = resSD['message'];
        }
      },(error)=>{
        console.log('resSD error',error);
          // $.alert({
          //   title: 'Error!',
          //   content: 'Something Went Wrong. Please try again Later.',
          // });
          this.display=true;
          this.success=false;
          this.result = 'Something went wrong. Please try again later.';
      });

    }else{
      // $.alert({
      //   title: 'Error!',
      //   content: 'Plase Enter Valid Email / Mobile',
      // });
      this.display=true;
      this.success=false;
      this.result = 'Please enter valid email/mobile.';
    }
  }

  redirectLogin(){
    this.router.navigate(["/login"]);
  }
}
