import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AcScorecardComponent } from './ac-scorecard.component';
import { AcScorecardRoutingModule } from './ac-scorecard-routing.module';
import { DialogModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AcScorecardRoutingModule,
    DialogModule,
	CalendarModule,
	AutoCompleteModule,
	BusyModule
  ],
  declarations: [
    AcScorecardComponent
  ]
})
export class AcScorecardModule { }
