import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RdsVisitComponent } from './rds_visit.component';
import { RdsVisitRoutingModule } from './rds_visit-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
	PaginatorModule,
	CalendarModule,
    RdsVisitRoutingModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    RdsVisitComponent
  ]
})
export class RdsVisitModule { }
