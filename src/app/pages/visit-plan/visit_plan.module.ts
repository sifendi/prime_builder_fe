import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { VisitPlanComponent } from './visit_plan.component';
import { VisitPlanRoutingModule } from './visit_plan-routing.module';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
	CalendarModule,
	AutoCompleteModule,
    VisitPlanRoutingModule,
	BusyModule,
  ],
  declarations: [
    VisitPlanComponent
  ]
})
export class VisitPlanModule { }
