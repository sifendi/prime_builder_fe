import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditProjectTypeComponent } from './edit-project-type.component';
import { EditProjectTypeRoutingModule } from './edit-project-type-routing.module';
import { DialogModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditProjectTypeRoutingModule,
    DialogModule
  ],
  declarations: [
    EditProjectTypeComponent
  ]
})
export class EditProjectTypeModule { }
