import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HpbComponent } from './hpb.component';
import { HpbRoutingModule } from './hpb-routing.module';
import { DialogModule } from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import { LightboxModule } from 'angular2-lightbox';
@NgModule({
  imports: [
    PaginatorModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    HpbRoutingModule,
    DialogModule,
    BusyModule,
    AutoCompleteModule,
    CalendarModule,
    ButtonModule,
    DropdownModule,
	LightboxModule
  ],
  declarations: [
    HpbComponent
  ]
})
export class HpbModule { }
