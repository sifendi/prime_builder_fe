import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MonthlyForecastTargetComponent } from './monthly_forecast_target.component';
import { MonthlyForecastTargetRoutingModule } from './monthly_forecast_target-routing.module';
import { KeysPipe2 } from '../../shared/keyspipe2.directive';
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
	BusyModule,
	MonthlyForecastTargetRoutingModule
  ],
  declarations: [
    MonthlyForecastTargetComponent,
	KeysPipe2
  ]
})
export class MonthlyForecastTargetModule { }
