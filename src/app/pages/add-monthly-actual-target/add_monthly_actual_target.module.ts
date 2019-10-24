import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddMonthlyActualTargetComponent } from './add_monthly_actual_target.component';
import { AddMonthlyActualTargetRoutingModule } from './add_monthly_actual_target-routing.module';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    CalendarModule,
    HttpModule,
    AddMonthlyActualTargetRoutingModule
  ],
  declarations: [
    AddMonthlyActualTargetComponent
  ]
})
export class AddMonthlyActualTargetModule { }
