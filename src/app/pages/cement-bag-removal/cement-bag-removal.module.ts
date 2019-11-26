import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CementBagRemovalComponent } from './cement-bag-removal.component';
import { CementBagRemovalRoutingModule } from './cement-bag-removal-routing.module';
import { DialogModule } from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    CementBagRemovalRoutingModule,
    DialogModule,
	CalendarModule,
	PaginatorModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    CementBagRemovalComponent
  ]
})
export class CementBagRemovalModule { }
