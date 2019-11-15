import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewProductReceiptComponent } from './view-product_receipt.component';
import { ViewProductReceiptRoutingModule } from './view-product_receipt-routing.module';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    ConfirmDialogModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewProductReceiptRoutingModule,
	BusyModule
  ],
  declarations: [
    ViewProductReceiptComponent
  ],
  providers: [ConfirmationService]
})
export class ViewProductReceiptModule { }
