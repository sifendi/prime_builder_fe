import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { SaComponent } from './sa.component';
import { SaRoutingModule } from './sa-routing.module';
import {AutoCompleteModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    SaRoutingModule,
    PaginatorModule,
    AutoCompleteModule,
    BusyModule
  ],
  declarations: [
    SaComponent
  ]
})
export class SaModule { }
