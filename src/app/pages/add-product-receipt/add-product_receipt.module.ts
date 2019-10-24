import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddProductReceiptComponent } from './add-product_receipt.component';
import { AddProductReceiptRoutingModule } from './add-product_receipt-routing.module';
import { DialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddProductReceiptRoutingModule,
    DialogModule
  ],
  declarations: [
    AddProductReceiptComponent
  ]
})
export class AddProductReceiptModule { }
