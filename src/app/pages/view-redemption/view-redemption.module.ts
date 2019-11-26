import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewRedemptionComponent } from './view-redemption.component';
import { ViewRedemptionRoutingModule } from './view-redemption-routing.module';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewRedemptionRoutingModule,
    DialogModule,
	BusyModule
  ],
  declarations: [
    ViewRedemptionComponent
  ]
})
export class ViewRedemptionModule { }
