import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewProductRequestComponent } from './view-product_request.component';
import { ViewProductRequestRoutingModule } from './view-product_request-routing.module';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewProductRequestRoutingModule,
	BusyModule
  ],
  declarations: [
    ViewProductRequestComponent
  ]
})
export class ViewProductRequestModule { }
