import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditProjectStageComponent } from './edit-project-stage.component';
import { EditProjectStageRoutingModule } from './edit-project-stage-routing.module';
import { DialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditProjectStageRoutingModule,
    DialogModule
  ],
  declarations: [
    EditProjectStageComponent
  ]
})
export class EditProjectStageModule { }
