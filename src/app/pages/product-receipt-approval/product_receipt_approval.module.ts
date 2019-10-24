import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProductReceiptApprovalComponent } from './product_receipt_approval.component';
import { ProductReceiptApprovalRoutingModule } from './product_receipt_approval-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ProductReceiptApprovalRoutingModule
  ],
  declarations: [
    ProductReceiptApprovalComponent
  ]
})
export class ProductReceiptApprovalModule { }
