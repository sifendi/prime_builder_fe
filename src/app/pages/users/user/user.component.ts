import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, App_usersApi } from '../../../../shared/loopback_sdk';
import {PaginatorModule} from 'primeng/primeng';

@Component({
  templateUrl: 'user.component.html'
})
export class UserComponent {
  
	userList:any;
	type:any;
	name:any;
	mobile:any;
	
	total:number;
	paginationVal:any = true;
	offset:number;
	
	constructor(private uApi:App_usersApi, private loopAuth:LoopBackAuth, private router: Router) {}
  
	ngOnInit(): void {
		this.getCount(0,10,"","","");
	}
	
	paginate(event) {
		this.userList = [];
		this.offset=event.page;
		this.getData(this.offset,10,this.type,this.name,this.mobile);
	}
	
	searchData(){
		if(this.name==undefined ||this.name=="" ){
			this.name = "";
		}
		if(this.type==undefined ||this.type==""){
			 this.type = "";
		}
		if(this.mobile==undefined ||this.mobile==""){
			 this.mobile = "";
		}
		this.userList = [];
		
		this.offset = 0;
		this.getCount(0,10,this.type,this.name,this.mobile);
		this.paginationVal=true;
	}
	
	viewUser(id,role){
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
				"role": role,
			}
		};  
		this.router.navigate(["users/view-user"], navigationExtras);
	}
	
	resetData(){
		this.offset= 0;
		this.type = "";
		this.name = "";
		this.mobile="";
		this.paginationVal=true;
		this.getCount(0,10,this.type,this.name,this.mobile);
	}
	
	getCount(offset,limit,type,name,mobile){
		this.uApi.getUsersDashboardCount("",type,name,"","",mobile).subscribe(
			data=>{
				this.total = data['result'][0]['total'];
				if(this.total <= 10){
					this.paginationVal = false;
				}
				this.getData(offset,limit,type,name,mobile); 
			},
			err=>{
	
			},
			()=>{

			}
		)
	}
	
	getData(offset,limit,type,name,mobile){
		this.uApi.getUsersDashboard("",type,name,limit,offset,mobile).subscribe(
			data=>{
				var totalData = data.result.length;
				this.userList = data.result;
			},
			err=>{

			},
			()=>{

			}
		)
	}
}