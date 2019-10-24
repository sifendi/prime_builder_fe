import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddNmcComponent } from './add-nmc.component';
import { AddNmcRoutingModule } from './add-nmc-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddNmcRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    AddNmcComponent
  ]
})
export class AddNmcModule { }
