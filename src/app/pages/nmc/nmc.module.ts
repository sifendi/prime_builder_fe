import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NmcComponent } from './nmc.component';
import { NmcRoutingModule } from './nmc-routing.module';
import {BusyModule} from 'angular2-busy';
import {PaginatorModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    NmcRoutingModule,
    BusyModule,
    PaginatorModule
  ],
  declarations: [
    NmcComponent
  ]
})
export class NmcModule { }
