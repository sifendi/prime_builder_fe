import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddProjectComponent } from './add-project.component';
import { AddProjectRoutingModule } from './add-project-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddProjectRoutingModule
  ],
  declarations: [
    AddProjectComponent
  ]
})
export class AddProjectModule { }
