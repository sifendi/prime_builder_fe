import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AmScorecardComponent } from './am-scorecard.component';
import { AmScorecardRoutingModule } from './am-scorecard-routing.module';
import { DialogModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AmScorecardRoutingModule,
    DialogModule,
	CalendarModule,
	AutoCompleteModule,
	BusyModule
  ],
  declarations: [
    AmScorecardComponent
  ]
})
export class AmScorecardModule { }
