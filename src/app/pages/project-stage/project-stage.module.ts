import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProjectStageComponent } from './project-stage.component';
import { ProjectStageRoutingModule } from './project-stage-routing.module';
import { DialogModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ProjectStageRoutingModule,
    DialogModule,
  BusyModule,
  PaginatorModule
  ],
  declarations: [
    ProjectStageComponent
  ]
})
export class ProjectStageModule { }