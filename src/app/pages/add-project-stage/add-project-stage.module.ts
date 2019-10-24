import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddProjectStageComponent } from './add-project-stage.component';
import { AddProjectStageRoutingModule } from './add-project-stage-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddProjectStageRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    AddProjectStageComponent
  ]
})
export class AddProjectStageModule { }
