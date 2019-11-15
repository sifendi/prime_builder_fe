import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, NgModel, NgControl, FormsModule } from '@angular/forms';
import { Project_typeApi, Project_stageApi, Postal_codeApi, NmcApi, App_projectsApi, App_hpbApi } from '../../../shared/loopback_sdk';
import * as moment from 'moment'; //for date manupalation
import { Lightbox, IAlbum, LightboxConfig } from 'angular2-lightbox';

declare var hostname:any;

@Component({
  templateUrl: 'view-project.component.html'
})
export class ViewProjectComponent {
	busy:any;
	public id: number;
	ProjData: any = [];
	tlhApproval:any = "";
	project_photo_array: any = []; 
	bank_document_array: any = []; 
	bank_document_image_array: any = []; 
	nmc_document_array:any = [];
	
	constructor(private route: ActivatedRoute, private projApi: App_projectsApi, private hpbApi: App_hpbApi, private projTypeApi: Project_typeApi, private proStApi: Project_stageApi, private pcApi: Postal_codeApi, private nmc: NmcApi,private _lightbox: Lightbox) {
		// this.route.queryParams.subscribe(params => {
		// 	this.id = params["id"];
		// });
		this.id=this.route.snapshot.params['id'];
	}

	ngAfterViewInit(): void {
    this.busy = this.projApi.getProject('', this.id).subscribe(
      data => {
        data.result[0].project_completion_date = moment(data.result[0].project_completion_date).format("DD MMM YYYY");

        // Project Photo processing
        var project_photo_obj;
        if(data.result[0].project_photo){
        	project_photo_obj = JSON.parse(data.result[0].project_photo);
			
			project_photo_obj.forEach(element => {
				var path = hostname+"/api/container/"+element['container']+"/download/"+element['name']
				this.project_photo_array.push({ src:path, thumb: path});
					
        	});
        	data.result[0].project_photo_array = this.project_photo_array;
        }
            

            //signature image processing
        if((data.result[0].hpb_digital_sign) && (data.result[0].hpb_digital_sign.indexOf("serverPath") > 0)){
        	var imagename = JSON.parse(data.result[0].hpb_digital_sign)[0];
			data.result[0].hpb_digital_sign = hostname+"/api/container/"+imagename.container+"/download/"+imagename.name;
			data.result[0].hpb_digital_sign = [{ source:data.result[0].hpb_digital_sign, thumbnail: data.result[0].hpb_digital_sign, title:""}];
		}else{
			data.result[0].hpb_digital_sign = "";
		}
		
            // Project Document processing
        if(data.result[0].bank_document){
			data.result[0].doc_images = [];
			
        	this.bank_document_array = JSON.parse(data.result[0].bank_document);
			this.bank_document_image_array = JSON.parse(data.result[0].bank_document);
			for(var j=0; j<(this.bank_document_array).length; j++){
				
				var imagename = this.bank_document_array[j];
				this.bank_document_array[j]['serverPath'] = hostname+"/api/container/"+imagename.container+"/download/"+imagename.name;
				
				if(this.bank_document_array[j].fileType=='jpeg' || this.bank_document_array[j].fileType=='jpg' || this.bank_document_array[j].fileType=='png'){
					data.result[0].doc_images.push({ src:this.bank_document_array[j]['serverPath'], thumb: this.bank_document_array[j]['serverPath'] });
					this.bank_document_image_array.push(this.bank_document_array[j]);
				}
				
				if(j+1 == this.bank_document_array.length){
					data.result[0].bank_document_array = this.bank_document_array;
				}
			}
        }
        
        if(data.result[0].nmc_document){
        	this.nmc_document_array = JSON.parse(data.result[0].nmc_document);
			for(var j=0; j<(this.nmc_document_array).length; j++){				
				var imagename = this.nmc_document_array[j];
				this.nmc_document_array[j]['serverPath'] = hostname+"/api/container/"+imagename.container+"/download/"+imagename.name;
				if(j+1 == this.nmc_document_array.length){
					data.result[0].nmc_document_array = this.nmc_document_array;
				}
			}
        }          
		
		if(data.result[0].is_micro_credit == 1){ data.result[0].is_micro_credit = "Yes"; }else{ data.result[0].is_micro_credit = "No"; }
		if(data.result[0].is_srku == 1){ data.result[0].is_srku = "Yes"; }else{ data.result[0].is_srku = "No"; }
		
		if(data.result[0].app !=""){
			this.tlhApproval = data.result[0].app[0];
			if(this.tlhApproval.srku_approval_status == 0){
				this.tlhApproval.srku_approval_status = "Pending";
				this.tlhApproval.srku_approval_class = "warning";
			}else if(this.tlhApproval.srku_approval_status == 1){
				this.tlhApproval.srku_approval_status = "Approved";
				this.tlhApproval.srku_approval_class = "success";
			}else if(this.tlhApproval.srku_approval_status == -1){
				this.tlhApproval.srku_approval_status = "Rejected";
				this.tlhApproval.srku_approval_class = "danger";
			}
		}
		this.ProjData = data.result[0];
      },
      err => {
      },
      () => {
      }
    )
  }
  open(type,index: number): void {
    // override the default config
    this._lightbox.open(type, index, { wrapAround: true, showImageNumberLabel: true });
  }
}
