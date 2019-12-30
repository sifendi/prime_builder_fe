import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { SummaryAcTlhComponent } from './summary-actlh.component';
import { SummaryAcTlhRoutingModule } from './summary-actlh-routing.module';
import { DialogModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        SummaryAcTlhRoutingModule,
        DialogModule,
        CalendarModule,
        AutoCompleteModule,
        BusyModule
    ],declarations: [
        SummaryAcTlhComponent
    ]
})
export class SummaryAcTlhModule { }