import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditSubdistrictComponent } from './edit-subdistrict.component';
import { EditSubdistrictRoutingModule } from './edit-subdistrict-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditSubdistrictRoutingModule,
    DialogModule,
    BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    EditSubdistrictComponent
  ]
})
export class EditSubdistrictModule { }
