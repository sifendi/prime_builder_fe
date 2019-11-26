import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewRdsVisitComponent } from './view-rds_visit.component';
import { ViewRdsVisitRoutingModule } from './view-rds_visit-routing.module';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewRdsVisitRoutingModule,
	BusyModule
  ],
  declarations: [
    ViewRdsVisitComponent
  ]
})
export class ViewRdsVisitModule { }
