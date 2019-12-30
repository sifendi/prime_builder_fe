import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { VisitSummaryAcTlhRoutingModule } from './visit-summary-actlh-routing.module';
import { VisitSummaryAcTlhComponent } from './visit-summary-actlh.component';
import { DialogModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        VisitSummaryAcTlhRoutingModule,
        DialogModule,
        CalendarModule,
        AutoCompleteModule,
        BusyModule
    ],declarations: [
        VisitSummaryAcTlhComponent
    ]
})
export class VisitSummaryAcTlhModule { }