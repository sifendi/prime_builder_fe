import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProductRequestComponent } from './product_request.component';
import { ProductRequestRoutingModule } from './product_request-routing.module';
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ProductRequestRoutingModule,
	CalendarModule,
	PaginatorModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    ProductRequestComponent
  ]
})
export class ProductRequestModule { }
