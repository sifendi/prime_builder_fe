import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RewardComponent } from './reward.component';
import { RewardRoutingModule } from './reward-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import { LightboxModule } from 'angular2-lightbox';

@NgModule({
  imports: [
    PaginatorModule,
    CommonModule, 
    FormsModule,
    HttpModule,
    RewardRoutingModule,
	BusyModule,
	LightboxModule
  ],
  declarations: [
    RewardComponent
  ]
})
export class RewardModule { }
