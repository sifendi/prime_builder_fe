import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditNmcComponent } from './edit-nmc.component';
import { EditNmcRoutingModule } from './edit-nmc-routing.module';
import { DialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditNmcRoutingModule,
    DialogModule
  ],
  declarations: [
    EditNmcComponent
  ]
})
export class EditNmcModule { }
