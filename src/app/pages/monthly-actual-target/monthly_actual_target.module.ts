import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MonthlyActualTargetComponent } from './monthly_actual_target.component';
import { MonthlyActualTargetRoutingModule } from './monthly_actual_target-routing.module';
import { KeysPipe3 } from '../../shared/keyspipe.directive';
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
    MonthlyActualTargetRoutingModule,
	BusyModule
  ],
  declarations: [
    MonthlyActualTargetComponent,
	KeysPipe3
  ]
})
export class MonthlyActualTargetModule { }
