import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App_product_receipt_approvalApi } from '../../../shared/loopback_sdk';

@Component({
  templateUrl: 'product_receipt_approval.component.html'
})
export class ProductReceiptApprovalComponent {

  receipt:any;
  loading:boolean = true;
  constructor(private prodApi:App_product_receipt_approvalApi) {

   }
  
   ngOnInit(): void {
        console.log('ngOnInit');
        this.prodApi.getProductReceiptApproval().subscribe(
          data=>{
            this.loading = false;
            for(var i=0; i<data.result.length; i++){
              if(data.result[i].approval_status == 1){
                data.result[i].approval_status = "Approved";
              }else if(data.result[i].approval_status == 0){
                data.result[i].approval_status = "Pending";
              }

              if(i+1 == data.result.length){
                  this.receipt = data.result;
              }
            }
          },
          err=>{

          },
          ()=>{

          }
        )
    }
}
