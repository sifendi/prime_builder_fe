import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditDistrictComponent } from './edit-district.component';
import { EditDistrictRoutingModule } from './edit-district-routing.module';
import { DialogModule } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditDistrictRoutingModule,
    DialogModule,
	AutoCompleteModule,
	BusyModule
  ],
  declarations: [
    EditDistrictComponent
  ]
})
export class EditDistrictModule { }
