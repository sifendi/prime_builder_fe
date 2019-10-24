import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AmComponent } from './am.component';
import { AmRoutingModule } from './am-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AmRoutingModule,
    PaginatorModule,
    BusyModule,
    AutoCompleteModule,
    CalendarModule,
    ButtonModule,
    DropdownModule
  ],
  declarations: [
    AmComponent
  ]
})
export class AmModule { }
