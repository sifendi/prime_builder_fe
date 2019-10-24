import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import {PaginatorModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ReportsRoutingModule,
	PaginatorModule
  ],
  declarations: [
    ReportsComponent
  ]
})
export class ReportsModule { }
