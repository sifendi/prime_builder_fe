import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RaComponent } from './ra.component';
import { RaRoutingModule } from './ra-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    RaRoutingModule,
    PaginatorModule,
    BusyModule,
    AutoCompleteModule
  ],
  declarations: [
    RaComponent
  ]
})
export class RaModule { }
