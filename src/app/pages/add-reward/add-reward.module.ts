import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AddRewardComponent } from './add-reward.component';
import { AddRewardRoutingModule } from './add-reward-routing.module';
import {CalendarModule} from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
	CalendarModule,
    HttpModule,
    AddRewardRoutingModule,
    BusyModule,
    DialogModule
  ],
  declarations: [
    AddRewardComponent
  ]
})
export class AddRewardModule { }