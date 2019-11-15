import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RedemptionComponent } from './redemption.component';
import { RedemptionRoutingModule } from './redemption-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    RedemptionRoutingModule,
    PaginatorModule,
    CalendarModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    RedemptionComponent
  ]
})
export class RedemptionModule { }
