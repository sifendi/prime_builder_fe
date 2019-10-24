import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { PendingProductReceiptComponent } from './pending_product_receipt.component';
import { PendingProductReceiptRoutingModule } from './pending_product_receipt-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    PendingProductReceiptRoutingModule,
	PaginatorModule,
	BusyModule,
	AutoCompleteModule,
	CalendarModule
  ],
  declarations: [
    PendingProductReceiptComponent
  ]
})
export class PendingProductReceiptModule { }
