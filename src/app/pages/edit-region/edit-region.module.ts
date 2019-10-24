import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditRegionComponent } from './edit-region.component';
import { EditRegionRoutingModule } from './edit-region-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    EditRegionRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    EditRegionComponent
  ]
})
export class EditRegionModule { }
