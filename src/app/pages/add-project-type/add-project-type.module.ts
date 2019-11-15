import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddProjectTypeComponent } from './add-project-type.component';
import { AddProjectTypeRoutingModule } from './add-project-type-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddProjectTypeRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    AddProjectTypeComponent
  ]
})
export class AddProjectTypeModule { }
