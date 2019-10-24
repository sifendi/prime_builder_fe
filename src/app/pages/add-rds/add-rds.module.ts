import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddRdsComponent } from './add-rds.component';
import { AddRdsRoutingModule } from './add-rds-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddRdsRoutingModule,
    DialogModule,
    BusyModule
  ],
  declarations: [
    AddRdsComponent
  ]
})
export class AddRdsModule { }
