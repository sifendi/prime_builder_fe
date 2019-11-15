import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EapSupportAssignmentComponent } from './eap-support-assignment.component';
import { EapSupportAssignmentRoutingModule } from './eap-support-assignment-routing.module';
import { DialogModule } from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    ConfirmDialogModule,
    PaginatorModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    EapSupportAssignmentRoutingModule,
    DialogModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    EapSupportAssignmentComponent
  ]
})
export class EapSupportAssignmentModule { }
