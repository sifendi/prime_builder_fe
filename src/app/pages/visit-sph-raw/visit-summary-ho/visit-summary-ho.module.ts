import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { VisitSummaryHoRoutingModule } from './visit-summary-ho-routing.module';
import { VisitSummaryHoComponent } from './visit-summary-ho.component';
import { DialogModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        VisitSummaryHoRoutingModule,
        DialogModule,
        CalendarModule,
        AutoCompleteModule,
        BusyModule
    ],declarations: [
        VisitSummaryHoComponent
    ]
})
export class VisitSummaryHoModule { }