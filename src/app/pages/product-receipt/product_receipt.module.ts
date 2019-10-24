import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProductReceiptComponent } from './product_receipt.component';
import { ProductReceiptRoutingModule } from './product_receipt-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ProductReceiptRoutingModule,
	PaginatorModule,
	BusyModule,
	AutoCompleteModule,
	CalendarModule
  ],
  declarations: [
    ProductReceiptComponent
  ]
})
export class ProductReceiptModule { }
