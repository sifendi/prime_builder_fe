import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewCementBagRemovalComponent } from './view-cement-bag-removal.component';
import { ViewCementBagRemovalRoutingModule } from './view-cement-bag-removal-routing.module';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewCementBagRemovalRoutingModule,
	BusyModule
  ],
  declarations: [
    ViewCementBagRemovalComponent
  ]
})
export class ViewCementBagRemovalModule { }
