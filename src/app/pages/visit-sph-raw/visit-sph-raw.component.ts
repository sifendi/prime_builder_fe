import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_usersApi, LoopBackAuth, User_mapApi, App_loginApi, RegionApi, ProvinceApi, DistrictApi, MunicipalityApi, SubdistrictApi, Postal_codeApi } from '../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment'; //for date manupalation
import { ConfirmationService } from 'primeng/primeng';
import { Message, MenuItem, SelectItem } from 'primeng/primeng';
import { ExcelService } from 'providers/services/services';

declare var window: any;
@Component({
	templateUrl: 'visit-sph-raw.component.html'
})
export class SPHVisitComponent {
	fullnameSearch: any = "";
	statusSearch: any = "";
	mobileNoSearch: any = "";
	busy: any;
	userList: any = [];
	type: any = "SPH";
	status: any = "";
	name: any;
	mobile: any;
	perPageLimit: any = 10;
	total: any = 0;
	paginationVal: any = true;
	offset: any = 0;
	allUsersFullName: any = [];
	filteredUserFullName: any = [];
	allUsersUserName: any = [];
	reqDateFrom: any;
	reqDateTo: any;
	value: Date;
	filteredUserName: any = [];
	loggedinrole: any;
	exportData: any = [];
	user_id: any;
	loading: boolean = true;
	fullNameErrors: boolean = false;
	userNameErrors: boolean = false;
	reqDateToSearch: any;
	reqDateFromSearch: any;

	constructor(private uApi: App_usersApi, private loopAuth: LoopBackAuth, private service: ExcelService, private router: Router) {
		var userDetails = this.loopAuth.getCurrentUserData();
		if (userDetails && (userDetails.userDet.roles)) {
			if (userDetails.userDet.roles[0]['name'] == "$ra") {
				this.loggedinrole = userDetails.userDet.roles[0]['name'];
				this.user_id = userDetails.id;
			}
		}
	}

	ngOnInit(): void {
		//this.getCount(this.perPageLimit,this.perPageLimit,this.type,null,null);
	}
	ngAfterViewInit() {
		this.getCount(this.offset, this.perPageLimit, this.type, null, null, null);
	}

	searchData() {
		if (this.value) {
			this.reqDateTo = moment(this.value).endOf('day').unix() * 1000;
		} else {
			this.reqDateTo = "";
		}
		if (this.name) {
			if (this.name.realm != "" && this.name.realm != undefined) {
				this.fullNameErrors = false;
				this.fullnameSearch = this.name.realm;
			} else {
				this.fullNameErrors = true;
			}
		} else {
			this.fullNameErrors = false;
			this.fullnameSearch = "";
		}
		if (this.mobile) {
			if (this.mobile.username != "" && this.mobile.username != undefined) {
				this.userNameErrors = false;
				this.mobileNoSearch = this.mobile.username;
			} else {
				this.userNameErrors = true;
			}
		} else {
			this.userNameErrors = false;
			this.mobileNoSearch = "";
		}
		if (!this.userNameErrors && !this.fullNameErrors) {
			this.offset = 0;
			this.paginationVal = false;
			this.statusSearch = this.status;
			this.reqDateToSearch = this.reqDateTo;
			this.getCount(this.offset, this.perPageLimit, this.type, this.fullnameSearch, this.mobileNoSearch, this.status);
		}
	}

	paginate(event) {
		this.userList = [];
		this.offset = event.page;
		this.getData(this.offset, this.perPageLimit, this.type, this.fullnameSearch, this.mobileNoSearch, this.statusSearch);
	}

	// viewUser(id,role){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 			"role": role,
	// 		}
	// 	};  
	// 	this.router.navigate(["users/view-user"], navigationExtras);
	// }

	editUser(id, role) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id,
				"role": role,
			}
		};
		this.router.navigate(["users/edit-user"], navigationExtras);
	}

	addUser() {
		let navigationExtras: NavigationExtras = {
			queryParams: {

			}
		};
		this.router.navigate(["users/add-user"], navigationExtras);
	}

	addBulkU() {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"role": '$sph',
			}
		};
		this.router.navigate(["users/upload-users"], navigationExtras);
	}

	filterFullName(event) {
		let query = event.query;
		let fmobile = window.safeValueWithKeyGet(this.mobile, 'username');
		this.uApi.getUsersDashboard(null, this.type, query, this.perPageLimit, 0, fmobile, null, this.user_id, this.loggedinrole).subscribe((dataRes) => {
			this.allUsersFullName = dataRes['result'];
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName, 'realm');
		});
	}

	// filterUserName(event){
	// 	let query = event.query;
	// 	let fname = window.safeValueWithKeyGet(this.name,'realm');
	// 	this.uApi.getUsersDashboard(null,this.type,fname,this.perPageLimit,0,query,null,this.user_id,this.loggedinrole).subscribe((dataRes)=>{
	// 		this.allUsersUserName = dataRes['result'];
	// 		if(this.allUsersUserName.length > 0){
	// 			this.userNameErrors = false;
	// 			console.log("available", this.allUsersUserName);
	// 			this.filteredUserName = this.filterAutocompleteData(query, this.allUsersUserName,'username');
	// 		}else{
	// 			console.log("notavailable", this.allUsersUserName);
	// 			this.userNameErrors = true;
	// 			this.filteredUserName = "";
	// 		}
	// 	});
	// }

	filterUserName(event) {
		let query = event.query;
		let fname = window.safeValueWithKeyGet(this.name, 'realm');
		this.uApi.getUsersDashboard(null, this.type, fname, this.perPageLimit, 0, query, null, this.user_id, this.loggedinrole).subscribe((dataRes) => {
			this.allUsersUserName = dataRes['result'];
			this.filteredUserName = this.filterAutocompleteData(query, this.allUsersUserName, 'username');
		});
	}

	filterAutocompleteData(query, filterAllData: any[], keyName): any[] {
		//in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
		let filtered: any[] = [];
		for (let i = 0; i < filterAllData.length; i++) {
			let currData = filterAllData[i];
			if (query == '' || query == null) {
				filtered.push(currData);
				if (i == this.perPageLimit) {
					break;
				}
			} else if (currData[keyName].toString().toLowerCase().includes(query.toLowerCase())) {
				filtered.push(currData);
			}
		}
		return filtered;
	}

	resetData() {
		this.offset = 0;
		this.name = null;
		this.mobile = null;
		this.status = "";
		this.fullnameSearch = null;
		this.mobileNoSearch = null;
		this.statusSearch = "";
		this.paginationVal = false;
		this.fullNameErrors = false;
		this.userNameErrors = false;
		this.reqDateToSearch = null;
		this.reqDateFromSearch = null;
		this.reqDateFrom = null;
		this.reqDateTo = null;
		this.getCount(this.offset, this.perPageLimit, this.type, this.name, this.mobile, this.reqDateToSearch);
	}

	getCount(offset, limit, type, fname, fmobile , reqDateTo) {
		console.log('name', fname);
		this.busy = this.uApi.getUsersDashboardCount(this.reqDateTo, type, fname, null, null, fmobile, this.user_id, 'sphr', this.status).subscribe(
			data => {
				this.total = data['result'][0][''];
				if (this.total <= 10) {
					this.paginationVal = false;
				} else {
					this.paginationVal = true;
				}
				this.getData(offset, limit, type, fname, fmobile, reqDateTo);
			},
			err => {

			},
			() => {

			}
		)
	}

	getData(offset, limit, type, fname, fmobile, status) {
		this.userList = [];
		this.busy = this.uApi.getUsersDashboard(this.reqDateTo, type, fname, limit, offset, fmobile, null, this.user_id, 'sphr', status).subscribe(
			data => {
				console.log("reqdate" +this.reqDateTo);
				this.loading = false;
				var totalData = data.result.length;
				this.userList = data.result;
			},
			err => {

			},
			() => {

			}
		)
	}

	// Download CSV Sample Code
	download() {
		this.exportData = [];
		let fname = window.safeValueWithKeyGet(this.name, 'realm');
		let fmobile = window.safeValueWithKeyGet(this.mobile, 'username');
		this.busy = this.uApi.getUsersDashboard(null, this.type, this.fullnameSearch, "", "", this.mobileNoSearch, null, this.user_id, 'sphr', this.statusSearch).subscribe(
			data => {
				var dataLength = data.result.length;
				for (var i = 0; i < dataLength; i++) {
					if (data.result[i].status == '1') {
						data.result[i].status = "ACTIVE"
					} else {
						data.result[i].status = "INACTIVE"
					}
					/*if(data.result[i].check_in_datetime = 'Invalid date')
					{
						data.result[i].check_in_datetime = null;
					}

					if(data.result[i].check_out_datetime = 'Invalid date')
					{
						data.result[i].check_out_datetime = null;
					}*/
					data.result[i].check_in_datetime = moment(data.result[i].check_in_datetime).format("hh:mm:ss");
					data.result[i].check_out_datetime = moment(data.result[i].check_out_datetime).format("hh:mm:ss");
					


					var arr = { 'SPH Name': data.result[i].realm, 'Username / Mobile No.': data.result[i].username, 'Region': data.result[i].regionname, 'Province': data.result[i].provincename, 'District': data.result[i].districtname, 'Visit Data': data.result[i].visitdate, 'Check_in_Time': data.result[i].check_in_datetime, 'Check_out_Time': data.result[i].check_out_datetime, 'GPS Coordinate': data.result[i].latitude + ',' + data.result[i].longitude, 'Customer Name': data.result[i].hpb_name, 'Customer Type': data.result[i].hpb_type, 'Phone No': data.result[i].primary_mobile_no };
					(this.exportData).push(arr);
				}
				//Function Call
				this.service.makeExcel(this.exportData, "sphRawData");
			},
			err => { },
			() => { }
		);
	}
}