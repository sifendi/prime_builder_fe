import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { App_usersApi,User_mapApi,RegionApi,ProvinceApi,DistrictApi,MunicipalityApi,SubdistrictApi,Postal_codeApi } from '../../../../shared/loopback_sdk';
import { ActivatedRoute } from "@angular/router";
import * as moment from 'moment'; //for date manupalation
import {ConfirmationService} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import {MenuItem} from 'primeng/primeng';
declare var window:any;

@Component({
	selector: "uploadUsers",
	templateUrl: 'upload-users.component.html',
	providers: [ConfirmationService],
	styles: [`
	.ui-steps .ui-steps-item {
		width: 25%;
	}
	
	.ui-steps.steps-custom {
		margin-bottom: 30px;
	}
	 
	.ui-steps.steps-custom .ui-steps-item .ui-menuitem-link {
		height: 10px;
		padding: 0 1em;
	}
	 
	.ui-steps.steps-custom .ui-steps-item .ui-steps-number {
		background-color: #0081c2;
		color: #FFFFFF;
		display: inline-block;
		width: 36px;
		border-radius: 50%;
		margin-top: -14px;
		margin-bottom: 10px;
	}
	
	.ui-steps.steps-custom .ui-steps-item .ui-steps-title {
		color: #555555;
	}
`],
encapsulation: ViewEncapsulation.None
})

export class UploadUserComponent {
	submited:any=false;
	busy:any;
	emptyMessage:String="No Result Found";
	displayConfirm: boolean = false;
	msgs: Message[] = [];
	msgsG: Message[] = [];
	uploadedFiles: any[] = [];
	items: MenuItem[];
	loading:boolean=false;
	activeIndex: number = 0;
	constructor(private router:Router,private confirmationService: ConfirmationService,private uApi: App_usersApi,public userMapApi:User_mapApi, private route: ActivatedRoute,public regionApi:RegionApi,public provinceApi:ProvinceApi,public districtApi:DistrictApi,public municipalityApi:MunicipalityApi,public subdistrictApi:SubdistrictApi,public postal_codeApi:Postal_codeApi) {
	
		
	}

	ngOnInit(): void {
	
		this.items = [{
			label: 'Select Role',
			command: (event: any) => {
				this.activeIndex = 0;
				this.msgs.length = 0;
				this.msgs.push({severity:'info', summary:'First Step', detail: event.item.label});
			}
		},
		{
			label: 'Select Sheet',
			command: (event: any) => {
				this.activeIndex = 1;
				this.msgs.length = 0;
				this.msgs.push({severity:'info', summary:'Seat Selection', detail: event.item.label});
			}
		},
		{
			label: 'Check and Confirm',
			command: (event: any) => {
				this.activeIndex = 2;
				this.msgs.length = 0;
				this.msgs.push({severity:'info', summary:'Pay with CC', detail: event.item.label});
			}
		},
		{
			label: 'Result',
			command: (event: any) => {
				this.activeIndex = 3;
				this.msgs.length = 0;
				this.msgs.push({severity:'info', summary:'Last Step', detail: event.item.label});
			}
		}
	];

	}

	onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

	roleSubmit(){
		this.activeIndex=1;
	}
	sheetSubmit(){
		this.activeIndex=2;
	}
	sheetcheck(){
		this.activeIndex=3;
	}
	resultSubmit(){
		this.activeIndex=0;
	}


	
	myUploader(event) {
		console.log('myUploader event',event)
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }


}