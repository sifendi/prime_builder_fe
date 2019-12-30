import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { VisitDetailComponent } from './visit-detail.component';
import { VisitDetailRoutingModule } from './visit-detail-routing.module';
import { DialogModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';
import { BusyModule } from 'angular2-busy';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        VisitDetailRoutingModule,
        DialogModule,
        CalendarModule,
        AutoCompleteModule,
        BusyModule
    ],declarations: [
        VisitDetailComponent
    ]
})
export class VisitDetailModule { }