import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddMonthlyForecastTargetComponent } from './add_monthly_forecast_target.component';
import { AddMonthlyForecastTargetRoutingModule } from './add_monthly_forecast_target-routing.module';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
	CalendarModule,
    HttpModule,
    AddMonthlyForecastTargetRoutingModule
  ],
  declarations: [
    AddMonthlyForecastTargetComponent
  ]
})
export class AddMonthlyForecastTargetModule{ }
