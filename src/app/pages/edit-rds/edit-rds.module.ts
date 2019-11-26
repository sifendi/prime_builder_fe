import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditRdsComponent } from './edit-rds.component';
import { EditRdsRoutingModule } from './edit-rds-routing.module';
import { DialogModule } from 'primeng/primeng';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditRdsRoutingModule,
    DialogModule
  ],
  declarations: [
    EditRdsComponent
  ]
})
export class EditRdsModule { }
