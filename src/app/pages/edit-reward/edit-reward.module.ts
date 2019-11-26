import { NgModule } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { EditRewardComponent } from './edit-reward.component';
import { EditRewardRoutingModule } from './edit-reward-routing.module';
import {CalendarModule} from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {BusyModule} from 'angular2-busy';
@NgModule({
  imports: [
    FileUploadModule,
    CommonModule, 
    FormsModule,
	CalendarModule,
    HttpModule,
    EditRewardRoutingModule,
    BusyModule,
    DialogModule
  ],
  declarations: [
    EditRewardComponent
  ]
})
export class EditRewardModule { }
