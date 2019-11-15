import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';
import { LightboxModule } from 'angular2-lightbox';
import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    PaginatorModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    ProjectRoutingModule,
	BusyModule,
	AutoCompleteModule,
	LightboxModule,
	CalendarModule
  ],
  declarations: [
    ProjectComponent
  ]
})
export class ProjectModule { }
