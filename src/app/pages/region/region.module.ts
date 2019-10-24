import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RegionComponent } from './region.component';
import { RegionRoutingModule } from './region-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {PaginatorModule} from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    RegionRoutingModule,
    DialogModule,
  BusyModule,
  PaginatorModule
  ],
  declarations: [
    RegionComponent
  ]
})
export class RegionModule { }
