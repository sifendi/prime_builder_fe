import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { DistrictComponent } from './district.component';
import { DistrictRoutingModule } from './district-routing.module';
import { DialogModule } from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    PaginatorModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    DistrictRoutingModule,
    DialogModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    DistrictComponent
  ]
})
export class DistrictModule { }
