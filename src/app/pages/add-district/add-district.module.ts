import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddDistrictComponent } from './add-district.component';
import { AddDistrictRoutingModule } from './add-district-routing.module';
import { DialogModule } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddDistrictRoutingModule,
    DialogModule,
	AutoCompleteModule,
	BusyModule
  ],
  declarations: [
    AddDistrictComponent
  ]
})
export class AddDistrictModule { }
