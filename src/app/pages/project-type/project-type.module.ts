import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProjectTypeComponent } from './project-type.component';
import { ProjectTypeRoutingModule } from './project-type-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {PaginatorModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ProjectTypeRoutingModule,
    DialogModule,
    PaginatorModule,
	  BusyModule
  ],
  declarations: [
    ProjectTypeComponent
  ]
})
export class ProjectTypeModule { }
