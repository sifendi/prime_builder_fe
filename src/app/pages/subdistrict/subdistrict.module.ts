import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { SubdistrictComponent } from './subdistrict.component';
import { SubdistrictRoutingModule } from './subdistrict-routing.module';
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
    SubdistrictRoutingModule,
    DialogModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    SubdistrictComponent
  ]
})
export class SubdistrictModule { }
