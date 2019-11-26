import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewProjectComponent } from './view-project.component';
import { ViewProjectRoutingModule } from './view-project-routing.module';
import {BusyModule} from 'angular2-busy';
import { LightboxModule } from 'angular2-lightbox';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewProjectRoutingModule,
	BusyModule,
	LightboxModule
  ],
  declarations: [
    ViewProjectComponent
  ]
})
export class ViewProjectModule { }
