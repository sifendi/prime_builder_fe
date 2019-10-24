import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewRdsComponent } from './view-rds.component';
import { ViewRdsRoutingModule } from './view-rds-routing.module';
import { DialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewRdsRoutingModule,
    DialogModule
  ],
  declarations: [
    ViewRdsComponent
  ]
})
export class ViewRdsModule { }
