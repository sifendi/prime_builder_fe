import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditProvinceComponent } from './edit-province.component';
import { EditProvinceRoutingModule } from './edit-province-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditProvinceRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    EditProvinceComponent
  ]
})
export class EditProvinceModule { }
