import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProductRequestRawDataComponent } from './product-request-raw-data.component';
import { ProductRequestRawDataRoutingModule } from './product-request-raw-data-routing.module';
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ProductRequestRawDataRoutingModule,
	CalendarModule,
	PaginatorModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    ProductRequestRawDataComponent
  ]
})
export class ProductRequestRawDataModule { }
