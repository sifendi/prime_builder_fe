import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RewardwishlistComponent } from './rewardwishlist.component';
import { RewardwishlistRoutingModule } from './rewardwishlist-routing.module';
import {PaginatorModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    HttpModule,
    RewardwishlistRoutingModule,
    PaginatorModule,
    CalendarModule,
	BusyModule,
	AutoCompleteModule
  ],
  declarations: [
    RewardwishlistComponent
  ]
})
export class RewardwishlistModule { }
