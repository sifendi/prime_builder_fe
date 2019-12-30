import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoopBackConfig, LoopBackAuth, App_product_requestApi, Retrieve_created_byApi, App_hpbApi, App_projectsApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment';
import { CalendarModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { ExcelService } from 'providers/services/services';

@Component({
	templateUrl: 'product-request-raw-data.component.html'
})
export class ProductRequestRawDataComponent {
	prodRequest: any;
	ifEmpty: boolean = false;
	busy: any;
	userDetails: any;
	rolename: any;
	loading: boolean = false;
	reqDateFrom: any;
	reqDateTo: any;
	value: Date;
	projectName: any;
	hpbName: any;
	reqStatus: any = "";
	user_id: any;
	createdBy: any;
	exportData: any = [];

	allHpb: any = [];
	filteredHpb: any = [];
	hpbCall: any;

	allUsersFullName: any = [];
	filteredUserFullName: any = [];

	allProject: any = [];
	filteredProject: any = [];
	projCall: any;

	//filter and pagination variable
	offset: number = 0;
	total: number = 0;
	limit: number = 10;
	paginationVal: any = true;
	perPageLimit: any = 10;
	offsetAuto: any = 0;
	reqStatusSearch: any = "";
	projectNameSearch: any = "";
	createdBySearch: any = "";
	hpbNameSearch: any = "";
	reqDateToSearch: any;
	reqDateFromSearch: any;

	projectNameErrors: boolean = false;
	createdByErrors: boolean = false;
	hpbNameErrors: boolean = false;

	maxDate: Date;
	constructor(private prReq: App_product_requestApi, private service: ExcelService, private createdApi: Retrieve_created_byApi, private router: Router, private loopAuth: LoopBackAuth, private hpbApi: App_hpbApi, private projApi: App_projectsApi) {
		this.maxDate = new Date();
		let userDetails = this.loopAuth.getCurrentUserData();
		this.rolename = userDetails.userDet.roles[0].name;
		if (this.rolename == "$ra") {
			this.user_id = userDetails.userDet.id;
		} else {
			this.rolename = "";
		}
	}

	ngAfterViewInit(): void {
		this.getCount("", "", "", "", "", 0, this.limit, "");
	}

	paginate(event) {
		this.prodRequest = [];
		this.offset = event.page;

		let createdby = "";
		if (this.createdBySearch) {
			createdby = this.createdBySearch.user_id;
		}
		let hpbId = null;
		if (this.hpbNameSearch) {
			hpbId = this.hpbNameSearch.id;
		}
		let projectId = null;
		if (this.projectNameSearch) {
			projectId = this.projectNameSearch.project_id;
		}
		this.getData(this.limit, this.offset, this.reqDateFromSearch, this.reqDateToSearch, this.reqStatusSearch, projectId, hpbId, createdby);
	}

	getCount(reqDateFrom, reqDateTo, hpbName, projectName, reqStatus, offset, limit, createdby) {
		if (hpbName) {
			hpbName = hpbName.hpb_id;
		}
		if (createdby) {
			createdby = createdby.user_id;
		}
		if (projectName) {
			projectName = projectName.project_id;
		}
		this.busy = this.prReq.getProductRequestCount("", createdby, "", "", "", this.user_id, this.rolename, "", "", hpbName, projectName, reqDateFrom, reqDateTo, reqStatus).subscribe(
			data => {
				this.total = data['result'][0]['total'];
				console.log(this.total);
				if (this.total <= this.limit) {
					this.paginationVal = false;
				} else {
					this.paginationVal = true;
				}
				this.getData(limit, offset, reqDateFrom, reqDateTo, reqStatus, projectName, hpbName, createdby);
			},
			err => { },
			() => { }
		)
	}

	searchData() {
		if (this.value) {
			this.reqDateFrom = moment(this.value).startOf('day').unix() * 1000;
			//this.reqDateTo = moment(this.value).endOf('day').unix() * 1000;
			console.log(this.value);
		} else {
			this.reqDateFrom = "";
			this.reqDateTo = "";
		}
		if (this.hpbName) {
			if (this.hpbName.hpb_id != undefined && this.hpbName.hpb_id != "") {
				this.hpbNameErrors = false;
			} else {
				this.hpbNameErrors = true;
			}
		} else {
			this.hpbNameErrors = false;
		}
		if (this.createdBy) {
			if (this.createdBy.user_id != undefined && this.createdBy.user_id != "") {
				this.createdByErrors = false;
			} else {
				this.createdByErrors = true;
			}
		} else {
			this.createdByErrors = false;
		}
		if (this.projectName) {
			if (this.projectName.project_id != undefined && this.projectName.project_id != "") {
				this.projectNameErrors = false;
			} else {
				this.projectNameErrors = true;
			}
		} else {
			this.projectNameErrors = false;
		}

		if (!this.hpbNameErrors && !this.createdByErrors && !this.projectNameErrors) {
			this.prodRequest = [];
			this.hpbNameSearch = this.hpbName;
			this.createdBySearch = this.createdBy;
			this.projectNameSearch = this.projectName;
			this.reqStatusSearch = this.reqStatus;
			this.reqDateFromSearch = this.reqDateFrom;
			this.reqDateToSearch = this.reqDateTo;
			this.offset = 0;
			this.paginationVal = false;
			this.ifEmpty = false;
			this.getCount(this.reqDateFromSearch, this.reqDateToSearch, this.hpbNameSearch, this.projectNameSearch, this.reqStatusSearch, 0, this.limit, this.createdBySearch);
		}
	}

	resetData() {
		this.paginationVal = false;
		this.reqDateFrom = "";
		this.reqDateTo = "";
		this.hpbName = "";
		this.offset = 0;
		this.projectName = "";
		this.reqStatus = "";
		this.createdBy = "";
		this.reqDateFromSearch = "";
		this.reqDateToSearch = "";
		this.hpbNameSearch = "";
		this.projectNameSearch = "";
		this.reqStatusSearch = "";
		this.createdBySearch = "";
		this.createdByErrors = false;
		this.hpbNameErrors = false;
		this.projectNameErrors = false;

		this.getCount(this.reqDateFrom, this.reqDateTo, this.hpbName, this.projectName, this.reqStatus, 0, this.limit, this.createdBy);
		this.value = null;
	}

	getData(limit, offset, reqDateFrom, reqDateTo, reqStatus, projectName, hpbName, createdBy) {
		this.busy = this.prReq.getProductRequest("", createdBy, "", "", "", this.user_id, this.rolename, limit, offset, hpbName, projectName, reqDateFrom, reqDateTo, reqStatus).subscribe(
			data => {
				var length = data.result.length;
				if (length == 0) {
					this.ifEmpty = true;
				} else {
					this.ifEmpty = false;
				}
				for (var i = 0; i < length; i++) {
					data.result[i].request_date = moment(data.result[i].request_date).format("DD MMM YY");
					if (data.result[i].product_request_status == 0) {
						data.result[i].product_request_status = "Pending";
						data.result[i].productclassname = "btn-warning";
					} else if (data.result[i].product_request_status == 1) {
						data.result[i].product_request_status = "Approved";
						data.result[i].productclassname = "btn-success";
					} else if (data.result[i].product_request_status == -1) {
						data.result[i].product_request_status = "Rejected";
						data.result[i].productclassname = "btn-danger";
					}
				}
				this.prodRequest = data.result;
			},
			err => {

			},
			() => {

			}
		)
	}

	// viewRequest(id){
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: {
	// 			"id": id,
	// 		}
	// 	};
	// 	this.router.navigate(["view-product-request"], navigationExtras);
	// }

	goToPage(page, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"id": id
			}
		}
		this.router.navigate(["/" + page], navigationExtras);
	}

	filterHpb(event) {
		let query = event.query;
		if (this.hpbCall) {
			this.hpbCall.unsubscribe();
		}
		this.hpbCall = this.busy = this.hpbApi.getHpb(null, null, null, null, null, null, null, null, null, null, null, null, this.perPageLimit, this.offsetAuto, null, null, null, query).subscribe((dataRes) => {
			this.allHpb = dataRes['result'];
			this.filteredHpb = this.filterAutocompleteData(query, this.allHpb, 'hpb_name');
		});
	}

	filterProject(event) {
		let query = event.query;
		if (this.projCall) {
			this.projCall.unsubscribe();
		}
		this.projCall = this.busy = this.projApi.getProject(null, null, query, null, null, null, null, null, null, null, null, null, null, this.perPageLimit, this.offsetAuto).subscribe((dataRes) => {
			this.allProject = dataRes['result'];
			this.filteredProject = this.filterAutocompleteData(query, this.allProject, 'project_name');
		});
	}

	filterFullName(event) {
		let query = event.query;
		this.busy = this.createdApi.getCreatedBy("products_request_tbl", this.perPageLimit, this.offsetAuto, query).subscribe((dataRes) => {
			this.allUsersFullName = dataRes['result'];
			this.filteredUserFullName = this.filterAutocompleteData(query, this.allUsersFullName, 'sph_name');
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

	download() {
		console.log("Export start");
		this.exportData = [];
		let product = "";
		if (this.projectNameSearch) {
			product = this.projectNameSearch.id;
		}
		let hpb = "";
		if (this.hpbNameSearch) {
			hpb = this.hpbNameSearch.hpb_id;
		}

		let userDetails = this.loopAuth.getCurrentUserData();
		let rolename = userDetails.userDet.roles[0].name;
		var user_id;
		if (rolename == "$ra") {
			user_id = userDetails.userDet.id;
		} else {
			rolename = "";
		}
		let createdBy = "";
		if (this.createdBySearch) {
			createdBy = this.createdBySearch.user_id;
		}

		this.busy = this.prReq.getProductRequest("", createdBy, "", "", "", this.user_id, this.rolename, "", this.offset, this.hpbName, this.projectName, this.reqDateFrom, this.reqDateTo, this.reqStatus).subscribe(
			data => {
				console.log("Initiate Export");
				console.log("offset" + this.offset)
				var dataLength = data.result.length;
				console.log("data", dataLength);
				for (var i = 0; i < dataLength; i++) {
					data.result[i].created_date = moment(data.result[i].created_date).format("DD MMM YYYY");
					data.result[i].purchase_date = moment(data.result[i].purchase_date).format("DD MMM YYYY");
					data.result[i].date_of_birth = moment(data.result[i].date_of_birth).format("DD MMM YYYY");
					data.result[i].switching_maintain_dt = moment(data.result[i].switching_maintain_dt).format("DD MMM YYYY");
					data.result[i].prospect_switching_dt = moment(data.result[i].prospect_switching_dt).format("DD MMM YYYY");
					data.result[i].request_date = moment(data.result[i].request_date).format("DD MMM YY");


					if (data.result[i].product_request_status == 0) {
						data.result[i].product_request_status = "Pending";
						data.result[i].productclassname = "btn-warning";
					} else if (data.result[i].product_request_status == 1) {
						data.result[i].product_request_status = "Approved";
						data.result[i].productclassname = "btn-success";
					} else if (data.result[i].product_request_status == -1) {
						data.result[i].product_request_status = "Rejected";
						data.result[i].productclassname = "btn-danger";
					}
					if (data.result[i].hpb_status == 'maintain') {
						data.result[i].hpb_status = 'Maintain';
					} else if (data.result[i].hpb_status == 'switching') {
						data.result[i].hpb_status = 'Switching';
					} else if (data.result[i].hpb_status == 'prospect') {
						data.result[i].hpb_status = 'Prospect';
					} else {
						data.result[i].hpb_status = '-';
					}

					if (data.result[i].hpb_type == 'mason') {
						data.result[i].hpb_type = 'Mason';
					} else if (data.result[i].hpb_type == 'contractor') {
						data.result[i].hpb_type = 'Contractor';
					}
					if (data.result[i].prospect_switching_dt == 'Invalid date') {
						data.result[i].prospect_switching_dt = "";
					}
					
					if (data.result[i].switching_maintain_dt == 'Invalid date') {
						data.result[i].switching_maintain_dt = "";
					}
					
					console.log("Result formation");

					var arr = { 'Request Status': data.result[i].product_request_status, 'Project': data.result[i].project_name, 'HPB': data.result[i].hpb_name, 'Request Date': data.result[i].request_date, 'Quantity Required': data.result[i].quantity_required, 'New Price Request': data.result[i].new_price_request, 'Term of payment': data.result[i].term_of_payment, 'Name': data.result[i].pic_name, 'Designation': data.result[i].pic_designation, 'Mobile': data.result[i].pic_mobile, 'Product Name': data.result[i].product_name, 'Retailer Name': data.result[i].req_rds_name, 'Price': data.result[i].price, 'Note': data.result[i].additional_comments, 'Request Remark': data.result[i].product_request_status_remark, 'Request Remark Comment': data.result[i].product_request_status_remark_comment, 'Project Name': data.result[i].project_name, 'Is SRKu?': data.result[i].is_srku ? "Yes" : "No", 'Project Type': data.result[i].Type, 'Project Stage': data.result[i].Stage, 'Cement Estimation': data.result[i].project_quantity_estimation, 'Address': data.result[i].project_address, 'Province': data.result[i].project_province, 'City / Municipality': data.result[i].project_city, 'Sub District': data.result[i].project_sub_district, 'HPB Name': data.result[i].hpb_name, 'HPB Status': data.result[i].hpb_status, 'Maintain Date': data.result[i].switching_maintain_dt, 'Switching Date': data.result[i].prospect_switching_dt, 'HPB Type': data.result[i].hpb_type, 'Primary Mobile No': data.result[i].primary_mobile_no, 'Secondary Mobile No': data.result[i].secondary_mobile_no, 'Id Card Number': data.result[i].id_card_number, 'Id Card Address': data.result[i].id_card_address, 'HPB Province': data.result[i].project_province, 'HPB City / Municipality': data.result[i].id_card_city, 'HPB Sub District': data.result[i].id_card_sub_district, 'Domicile Address': data.result[i].domicile_address, 'Domicile Province': data.result[i].domicile_province, 'Domicile City / Municipality': data.result[i].domicile_city, 'Domicile Sub District': data.result[i].domicile_sub_district, 'Place Of Birth': data.result[i].place_of_birth, 'Date Of Birth': data.result[i].date_of_birth, 'Email': data.result[i].hpb_email, 'Company name': data.result[i].company_name, 'Company Representative Name': data.result[i].company_representative_name, 'HPB Designation': data.result[i].company_designation , 'Sph Name' : data.result[i].realm, 'Sph Username/Mobile' : data.result[i].username, 'District' : data.result[i].district, 'Sph Province': data.result[i].province, 'Region':data.result[i].region};
					(this.exportData).push(arr);
				}

				//Function Call
				this.service.makeExcel(this.exportData, "prodRequestRawData");
			},
			err => { },
			() => { console.log(Error.toString); }
		);
	}
}
