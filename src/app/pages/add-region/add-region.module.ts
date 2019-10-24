import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddRegionComponent } from './add-region.component';
import { AddRegionRoutingModule } from './add-region-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    AddRegionRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    AddRegionComponent
  ]
})
export class AddRegionModule { }
