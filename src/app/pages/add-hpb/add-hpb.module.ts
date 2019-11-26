import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddHpbComponent } from './add-hpb.component';
import { AddHpbRoutingModule } from './add-hpb-routing.module';
import { DialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddHpbRoutingModule,
    DialogModule
  ],
  declarations: [
    AddHpbComponent
  ]
})
export class AddHpbModule { }
