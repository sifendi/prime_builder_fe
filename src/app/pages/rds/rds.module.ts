import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RdsComponent } from './rds.component';
import { RdsRoutingModule } from './rds-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    PaginatorModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    RdsRoutingModule,
	AutoCompleteModule,
  BusyModule,
  DialogModule
  ],
  declarations: [
    RdsComponent
  ]
})
export class RdsModule { }
