import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddSubdistrictComponent } from './add-subdistrict.component';
import { AddSubdistrictRoutingModule } from './add-subdistrict-routing.module';
import { DialogModule } from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddSubdistrictRoutingModule,
    BusyModule,
    DialogModule,
	AutoCompleteModule
  ],
  declarations: [
    AddSubdistrictComponent
  ]
})
export class AddSubdistrictModule { }
