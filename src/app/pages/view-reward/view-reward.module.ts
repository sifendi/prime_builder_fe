import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ViewRewardComponent } from './view-reward.component';
import { ViewRewardRoutingModule } from './view-reward-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    ViewRewardRoutingModule
  ],
  declarations: [
    ViewRewardComponent
  ]
})
export class ViewRewardModule { }
