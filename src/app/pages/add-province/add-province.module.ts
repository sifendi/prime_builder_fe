import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddProvinceComponent } from './add-province.component';
import { AddProvinceRoutingModule } from './add-province-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddProvinceRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    AddProvinceComponent
  ]
})
export class AddProvinceModule { }
