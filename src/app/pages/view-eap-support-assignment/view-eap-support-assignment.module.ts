import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewEapSupportAssignmentComponent } from './view-eap-support-assignment.component';
import { ViewEapSupportAssignmentRoutingModule } from './view-eap-support-assignment-routing.module';
import { DialogModule } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewEapSupportAssignmentRoutingModule,
    DialogModule,
	AutoCompleteModule,
	BusyModule
  ],
  declarations: [
    ViewEapSupportAssignmentComponent
  ]
})
export class ViewEapSupportAssignmentModule { }
