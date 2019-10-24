import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddVisitPlanComponent } from './add_visit_plan.component';
import { AddVisitPlanRoutingModule } from './add_visit_plan-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
	HttpModule,
    AddVisitPlanRoutingModule
  ],
  declarations: [
    AddVisitPlanComponent
  ]
})
export class AddVisitPlanModule { }
