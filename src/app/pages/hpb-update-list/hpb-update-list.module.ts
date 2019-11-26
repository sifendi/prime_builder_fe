import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HpbUpdateListComponent } from './hpb-update-list.component';
import { HpbUpdateListRoutingModule } from './hpb-update-list-routing.module';
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
    HpbUpdateListRoutingModule,
    PaginatorModule,
    BusyModule,
    AutoCompleteModule,
    CalendarModule,
    ButtonModule,
    DropdownModule
  ],
  declarations: [
    HpbUpdateListComponent
  ]
})
export class HpbUpdateListModule { }
