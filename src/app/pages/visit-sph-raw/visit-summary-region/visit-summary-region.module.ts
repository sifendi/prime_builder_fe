import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { VisitSummaryRegionRoutingModule } from './visit-summary-region-routing.module';
import { VisitSummaryRegionComponent } from './visit-summary-region.component';
import { DialogModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        VisitSummaryRegionRoutingModule,
        DialogModule,
        CalendarModule,
        AutoCompleteModule,
        BusyModule
    ],declarations: [
        VisitSummaryRegionComponent
    ]
})
export class VisitSummaryRegionModule { }